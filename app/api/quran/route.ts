import { NextRequest, NextResponse } from "next/server";
import { getStatus, getVerse, validReference } from "@/lib/q4q";

export async function GET(request: NextRequest) {
  try {
    if (request.nextUrl.searchParams.get("mode") === "status") {
      return NextResponse.json(await getStatus());
    }

    const reference = request.nextUrl.searchParams.get("reference")?.trim() || "1:1";

    if (!validReference(reference)) {
      return NextResponse.json(
        { error: "Use surah:ayah, for example 2:255." },
        { status: 400 }
      );
    }

    return NextResponse.json(await getVerse(reference));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Quran API error." },
      { status: 500 }
    );
  }
}
