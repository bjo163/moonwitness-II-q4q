import { NextRequest, NextResponse } from "next/server";
import { getStatus, getTextUnit, validReference } from "@/lib/q4q";

export async function GET(request: NextRequest) {
  const corpus = request.nextUrl.searchParams.get("corpus")?.trim() || "quran";

  try {
    if (request.nextUrl.searchParams.get("mode") === "status") {
      return NextResponse.json({
        corpus,
        ...(await getStatus())
      });
    }

    const reference = request.nextUrl.searchParams.get("reference")?.trim() || "1:1";

    if (corpus === "quran" && !validReference(reference)) {
      return NextResponse.json(
        { error: "For Quran use reference format surah:ayah, for example 2:255." },
        { status: 400 }
      );
    }

    return NextResponse.json(await getTextUnit({ corpus, reference }));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Scripture API error." },
      { status: 500 }
    );
  }
}
