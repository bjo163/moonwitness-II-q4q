import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

function getServerClient() {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) return null;

  return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export async function getStatus() {
  const supabase = getServerClient();

  if (!supabase) {
    return {
      live: false,
      locks: [{ scope_code: "QURAN_CORE_V1", status: "CLOSED", certification: "DEMO_FALLBACK" }],
      evidenceRun: {
        code: "QURAN_EVIDENCE_CROSSREFERENCE_V1",
        status: "VERIFIED",
        unique_ayahs: 6236,
        evidence_record_count: 37851,
        crossref_count: 24394
      }
    };
  }

  const [{ data: locks, error: lockError }, { data: evidenceRun, error: runError }] =
    await Promise.all([
      supabase
        .from("foundation_locks")
        .select("scope_code,status,certification")
        .order("scope_code"),
      supabase
        .from("quran_evidence_runs")
        .select("code,status,unique_ayahs,evidence_record_count,crossref_count")
        .eq("code", "QURAN_EVIDENCE_CROSSREFERENCE_V1")
        .maybeSingle()
    ]);

  if (lockError) throw new Error(lockError.message);
  if (runError) throw new Error(runError.message);

  return {
    live: true,
    locks: locks ?? [],
    evidenceRun: evidenceRun ?? null
  };
}

export function validReference(reference: string) {
  return /^(?:[1-9]|[1-9][0-9]|1[01][0-4]):(?:[1-9]|[1-9][0-9]{1,2})$/.test(reference);
}

export async function getTextUnitEvidence({
  corpus,
  reference
}: {
  corpus: string;
  reference: string;
}) {
  if (corpus !== "quran") {
    throw new Error(`Corpus "${corpus}" is not enabled yet. The API is generic and Quran is the first active corpus.`);
  }

  const supabase = getServerClient();

  if (!supabase) {
    return { live: false, corpus, reference, layers: [] };
  }

  const { data: structure, error: structureError } = await supabase
    .from("quran_ayah_structure")
    .select("text_unit_id,reference")
    .eq("reference", reference)
    .maybeSingle();

  if (structureError) throw new Error(structureError.message);
  if (!structure) throw new Error("Text unit not found.");

  const { data, error } = await supabase
    .from("quran_evidence_records")
    .select("evidence_type,evidence_key,source_version,source_locator,method,verified,payload")
    .eq("text_unit_id", structure.text_unit_id)
    .order("evidence_type")
    .order("evidence_key");

  if (error) throw new Error(error.message);

  return {
    live: true,
    corpus,
    reference: structure.reference,
    layers: data ?? []
  };
}

export async function getTextUnit({
  corpus,
  reference
}: {
  corpus: string;
  reference: string;
}) {
  if (corpus !== "quran") {
    throw new Error(`Corpus "${corpus}" is not enabled yet. The API is generic and Quran is the first active corpus.`);
  }

  return getQuranTextUnit(reference);
}

async function getQuranTextUnit(reference: string) {
  const supabase = getServerClient();

  if (!supabase) {
    if (reference !== "1:1") {
      throw new Error("Live Supabase credentials are required for references other than 1:1.");
    }
    return {
      reference: "1:1",
      global_ayah_index: 1,
      surah_number: 1,
      ayah_number: 1,
      surah_name_arabic: "الفاتحة",
      surah_name_transliterated: "Al-Fatihah",
      surah_name_english: "The Opener",
      revelation_type: "Meccan",
      revelation_order: 5,
      juz: 1,
      hizb_quarter: 1,
      hizb: 1,
      manzil: 1,
      ruku: 1,
      mushaf_page: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      checksum_sha256: null,
      verified: true,
      demo: true
    };
  }

  const { data: structure, error: structureError } = await supabase
    .from("quran_ayah_structure")
    .select("text_unit_id,reference,global_ayah_index,surah_number,ayah_number,surah_name_arabic,surah_name_transliterated,surah_name_english,revelation_type,revelation_order,juz,hizb_quarter,hizb,manzil,ruku,mushaf_page")
    .eq("reference", reference)
    .maybeSingle();

  if (structureError) throw new Error(structureError.message);
  if (!structure) throw new Error("Quran reference not found.");

  const { data: representation, error: representationError } = await supabase
    .from("text_representations")
    .select("text,checksum_sha256,verified")
    .eq("text_unit_id", structure.text_unit_id)
    .eq("canonical", true)
    .eq("verified", true)
    .limit(1)
    .maybeSingle();

  if (representationError) throw new Error(representationError.message);
  if (!representation) throw new Error("Canonical Arabic representation not found.");

  return {
    ...structure,
    text: representation.text,
    checksum_sha256: representation.checksum_sha256,
    verified: representation.verified
  };
}
