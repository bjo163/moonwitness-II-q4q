'use client';

import { FormEvent, useEffect, useMemo, useState } from "react";

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
  locks: Array<{
    scope_code: string;
    status: string;
    certification: string | null;
  }>;
  evidenceRun: {
    code: string;
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
] as const;

const quickRefs = ["1:1", "2:255", "36:1", "112:1"];

export default function Home() {
  const [reference, setReference] = useState("1:1");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load(ref: string) {
    setBusy(true);
    setError("");

    try {
      const [verseResponse, statusResponse] = await Promise.all([
        fetch("/api/quran?reference=" + encodeURIComponent(ref), {
          cache: "no-store"
        }),
        fetch("/api/quran?mode=status", { cache: "no-store" })
      ]);

      const versePayload = await verseResponse.json();
      const statusPayload = await statusResponse.json();

      if (!verseResponse.ok) {
        throw new Error(versePayload.error ?? "Unable to load Quran reference.");
      }

      if (!statusResponse.ok) {
        throw new Error(statusPayload.error ?? "Unable to load foundation status.");
      }

      setVerse(versePayload);
      setStatus(statusPayload);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load.");
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void load(reference.trim());
  }

  useEffect(() => {
    void load("1:1");
  }, []);

  const closedLockCount = useMemo(
    () => status?.locks.filter((lock) => lock.status === "LOCKED").length ?? 0,
    [status]
  );

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">Q4Q</span>
          <span className="brand-copy">
            <strong>QURAN CORE</strong>
            <small>MOONWITNESS II</small>
          </span>
        </a>

        <div className={`connection ${status?.live ? "live" : "demo"}`}>
          <span className="dot" />
          {status?.live ? "SUPABASE LIVE" : "DEMO FALLBACK"}
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">QURAN_CORE_V1 / CLOSED</div>
        <h1>
          Read the source.
          <br />
          Follow the evidence.
        </h1>
        <p>
          A read-only explorer for the closed Quran Core. Canonical text is
          kept separate from observations, morphology, external ontologies,
          claims, and interpretation.
        </p>

        <div className="hero-actions">
          <div className="lock-banner">
            <span className="lock-icon">●</span>
            <div>
              <b>QURAN CORE V1 — CLOSED</b>
              <small>{closedLockCount} locked foundation scopes detected</small>
            </div>
          </div>

          <a className="ghost-link" href="#explorer">
            Open explorer ↓
          </a>
        </div>
      </section>

      <section className="metrics" aria-label="Foundation metrics">
        <div className="metric">
          <span>AYAH SPINES</span>
          <strong>{status?.evidenceRun?.unique_ayahs?.toLocaleString() ?? "—"}</strong>
          <small>canonical references</small>
        </div>
        <div className="metric">
          <span>EVIDENCE</span>
          <strong>{status?.evidenceRun?.evidence_record_count?.toLocaleString() ?? "—"}</strong>
          <small>verified records</small>
        </div>
        <div className="metric">
          <span>CROSSREFS</span>
          <strong>{status?.evidenceRun?.crossref_count?.toLocaleString() ?? "—"}</strong>
          <small>verified links</small>
        </div>
        <div className="metric">
          <span>CORE STATE</span>
          <strong>CLOSED</strong>
          <small>mutation boundary</small>
        </div>
      </section>

      <section className="panel explorer" id="explorer">
        <div className="panel-head">
          <div>
            <div className="eyebrow">VERSE LOOKUP</div>
            <h2>Open an ayah</h2>
          </div>
          <div className="quick-links">
            {quickRefs.map((item) => (
              <button
                key={item}
                className="chip"
                type="button"
                onClick={() => {
                  setReference(item);
                  void load(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <form className="lookup" onSubmit={submit}>
          <div className="field">
            <span>REFERENCE</span>
            <input
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="2:255"
              inputMode="numeric"
              aria-label="Quran reference"
              autoComplete="off"
            />
          </div>
          <button className="read-btn" type="submit" disabled={busy}>
            {busy ? "READING…" : "READ AYAH"}
          </button>
        </form>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
      </section>

      <section className="grid">
        <article className="panel verse-card">
          <div className="panel-head">
            <div>
              <div className="eyebrow">CANONICAL REPRESENTATION</div>
              <h2>{verse?.reference ?? "—"}</h2>
            </div>
            {verse?.verified ? <span className="verified">VERIFIED</span> : null}
          </div>

          <div className="surah">
            <span dir="rtl">{verse?.surah_name_arabic ?? "—"}</span>
            <div>
              <b>{verse?.surah_name_transliterated ?? "—"}</b>
              <small>{verse?.surah_name_english ?? "—"}</small>
            </div>
          </div>

          <div className="arabic" dir="rtl" lang="ar">
            {verse?.text ?? "Loading canonical text…"}
          </div>

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
              <div key={label}>
                <span>{label}</span>
                <b>{value ?? "—"}</b>
              </div>
            ))}
          </div>

          {verse?.checksum_sha256 ? (
            <div className="checksum">
              <span>CANONICAL SHA256</span>
              <code>{verse.checksum_sha256}</code>
            </div>
          ) : null}

          {verse?.demo ? (
            <div className="demo-note">
              Demo mode is active. Set the server-only Supabase secret to read the full live corpus.
            </div>
          ) : null}
        </article>

        <aside className="panel side-card">
          <div className="eyebrow">FOUNDATION MAP</div>
          <h2>Core layers</h2>

          <div className="layers">
            {layers.map(([number, name, state]) => (
              <div className="layer" key={number}>
                <span className="number">{number}</span>
                <div>
                  <b>{name}</b>
                  <small>{state}</small>
                </div>
                <span className="state">{state}</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="eyebrow">ACTIVE LOCKS</div>
          <div className="locks">
            {(status?.locks ?? []).map((lock) => (
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
        <span>Supabase = data platform · Rust = deterministic engine</span>
      </footer>
    </main>
  );
}
