'use client';

import { useEffect, useState } from "react";

type Verse = {
  reference: string;
  global_ayah_index: number;
  surah_number: number;
  ayah_number: number;
  surah_name_arabic: string;
  surah_name_transliterated: string;
  surah_name_english: string;
  revelation_type: string | null;
  revelation_order: number | null;
  juz: number | null;
  hizb_quarter: number | null;
  hizb: number | null;
  manzil: number | null;
  ruku: number | null;
  mushaf_page: number | null;
  text: string;
  checksum_sha256: string | null;
  verified: boolean;
  demo?: boolean;
};

type Status = {
  live: boolean;
  locks: { scope_code: string; status: string; certification: string | null }[];
  evidenceRun: {
    status: string;
    unique_ayahs: number;
    evidence_record_count: number;
    crossref_count: number;
  } | null;
};

const layers = [
  ["01", "Canonical Arabic Text", "CLOSED"],
  ["02", "Structural Metadata", "CLOSED"],
  ["03", "Observation", "VERIFIED"],
  ["04", "Lexical", "VERIFIED"],
  ["05", "QAC Morphology", "VERIFIED"],
  ["06", "Evidence / Cross-reference", "CLOSED"]
];

export default function Home() {
  const [reference, setReference] = useState("1:1");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(ref: string) {
    setBusy(true);
    setError("");
    try {
      const [verseRes, statusRes] = await Promise.all([
        fetch("/api/quran?reference=" + encodeURIComponent(ref), { cache: "no-store" }),
        fetch("/api/quran?mode=status", { cache: "no-store" })
      ]);
      const verseData = await verseRes.json();
      const statusData = await statusRes.json();
      if (!verseRes.ok) throw new Error(verseData.error ?? "Unable to load verse.");
      if (!statusRes.ok) throw new Error(statusData.error ?? "Unable to load status.");
      setVerse(verseData);
      setStatus(statusData);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { void load("1:1"); }, []);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">Q4Q</span>
          <div>
            <strong>QURAN CORE</strong>
            <span>MOONWITNESS II</span>
          </div>
        </div>
        <div className={"connection " + (status?.live ? "live" : "demo")}>
          <span className="dot" />
          {status?.live ? "SUPABASE LIVE" : "DEMO / CONFIG REQUIRED"}
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">QURAN_CORE_V1</div>
        <h1>Canonical foundation.<br />Evidence first.</h1>
        <p>
          Read-only explorer for the closed Quran Core. Canonical text stays
          separate from observation, morphology, external ontology, claims, and
          interpretation.
        </p>
        <div className="lock-banner">
          <span>●</span>
          <b>QURAN CORE V1 — CLOSED</b>
          <small>Mutation boundary preserved in Supabase.</small>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <div className="eyebrow">VERSE LOOKUP</div>
            <h2>Open an ayah</h2>
          </div>
          <div className="quick-links">
            {["1:1", "2:255", "36:1", "112:1"].map((value) => (
              <button key={value} className="chip" onClick={() => { setReference(value); void load(value); }}>
                {value}
              </button>
            ))}
          </div>
        </div>
        <form className="lookup" onSubmit={(event) => { event.preventDefault(); void load(reference); }}>
          <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="2:255" aria-label="Quran reference" />
          <button type="submit" disabled={busy}>{busy ? "READING…" : "READ"}</button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>

      <section className="grid">
        <article className="panel verse-card">
          <div className="panel-head">
            <div>
              <div className="eyebrow">CANONICAL TEXT</div>
              <h2>{verse?.reference ?? "—"}</h2>
            </div>
            {verse?.verified && <span className="verified">VERIFIED</span>}
          </div>

          <div className="surah">
            <span>{verse?.surah_name_arabic ?? "—"}</span>
            <b>{verse?.surah_name_transliterated ?? "—"} · {verse?.surah_name_english ?? "—"}</b>
          </div>

          <div className="arabic" dir="rtl">{verse?.text ?? "Loading…"}</div>

          <div className="metadata">
            {[
              ["GLOBAL", verse?.global_ayah_index],
              ["JUZ", verse?.juz],
              ["HIZB", verse?.hizb],
              ["QUARTER", verse?.hizb_quarter],
              ["MANZIL", verse?.manzil],
              ["RUKU", verse?.ruku],
              ["PAGE", verse?.mushaf_page],
              ["REVELATION", verse?.revelation_type]
            ].map(([label, value]) => (
              <div key={label}><span>{label}</span><b>{value ?? "—"}</b></div>
            ))}
          </div>

          {verse?.checksum_sha256 && (
            <div className="checksum">SHA256 <code>{verse.checksum_sha256}</code></div>
          )}
          {verse?.demo && <div className="demo-note">Demo fallback — add SUPABASE_SECRET_KEY for live Quran data.</div>}
        </article>

        <aside className="panel">
          <div className="eyebrow">FOUNDATION MAP</div>
          <h2>Closed layers</h2>

          <div className="layers">
            {layers.map(([number, name, state]) => (
              <div className="layer" key={number}>
                <span className="number">{number}</span>
                <div><b>{name}</b><small>{state}</small></div>
                <span className="state">{state}</span>
              </div>
            ))}
          </div>

          <div className="divider" />
          <div className="eyebrow">EVIDENCE RUN</div>
          <div className="stats">
            <div><span>AYAH SPINES</span><strong>{status?.evidenceRun?.unique_ayahs?.toLocaleString() ?? "—"}</strong></div>
            <div><span>RECORDS</span><strong>{status?.evidenceRun?.evidence_record_count?.toLocaleString() ?? "—"}</strong></div>
            <div><span>CROSSREFS</span><strong>{status?.evidenceRun?.crossref_count?.toLocaleString() ?? "—"}</strong></div>
          </div>

          <div className="divider" />
          <div className="eyebrow">LOCKS</div>
          <div className="locks">
            {(status?.locks ?? []).slice(0, 6).map((lock) => (
              <div className="lock-row" key={lock.scope_code}>
                <span>{lock.scope_code.replace(/^QURAN_/, "")}</span>
                <b>{lock.status}</b>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <footer>
        <span>Q4Q / Quran Foundation</span>
        <span>Source of truth: Supabase · Code: GitHub</span>
      </footer>
    </main>
  );
}
