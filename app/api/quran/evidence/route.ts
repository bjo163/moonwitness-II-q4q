import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference")?.trim() || "1:1";

  if (!url || !secret) {
    return NextResponse.json({
      live: false,
      reference,
      layers: []
    });
  }

  const supabase = createClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data: structure, error: structureError } = await supabase
    .from("quran_ayah_structure")
    .select("text_unit_id,reference")
    .eq("reference", reference)
    .maybeSingle();

  if (structureError) {
    return NextResponse.json({ error: structureError.message }, { status: 500 });
  }

  if (!structure) {
    return NextResponse.json({ error: "Quran reference not found." }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("quran_evidence_records")
    .select("evidence_type,evidence_key,source_version,source_locator,method,verified,payload")
    .eq("text_unit_id", structure.text_unit_id)
    .order("evidence_type")
    .order("evidence_key");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    live: true,
    reference: structure.reference,
    layers: data ?? []
  });
}
