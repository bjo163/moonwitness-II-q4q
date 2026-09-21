import { NextRequest, NextResponse } from "next/server";
import { getTextUnitEvidence } from "@/lib/q4q";

export async function GET(request: NextRequest) {
  const corpus = request.nextUrl.searchParams.get("corpus")?.trim() || "quran";
  const reference = request.nextUrl.searchParams.get("reference")?.trim() || "1:1";

  try {
    return NextResponse.json(await getTextUnitEvidence({ corpus, reference }));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Evidence API error." },
      { status: 500 }
    );
  }
}
