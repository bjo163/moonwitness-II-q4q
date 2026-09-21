'use client';

import { FormEvent, useEffect, useMemo, useState } from "react";

type TextUnit = {
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

type Evidence = {
  live: boolean;
  reference: string;
  layers: Array<{
    evidence_type: string;
    evidence_key: string;
    source_version: string | null;
    source_locator: string | null;
    method: string | null;
    verified: boolean;
    payload: unknown;
  }>;
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
  const [textUnit, setTextUnit] = useState<TextUnit | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load(ref: string) {
    setBusy(true);
    setError("");

    try {
      const [verseResponse, statusResponse] = await Promise.all([
        fetch("/api/scripture?corpus=quran&reference=" + encodeURIComponent(ref), {
          cache: "no-store"
        }),
        fetch("/api/scripture?corpus=quran&mode=status", { cache: "no-store" })
      ]);

      const versePayload = await verseResponse.json();
      const statusPayload = await statusResponse.json();

      if (!verseResponse.ok) {
        throw new Error(versePayload.error ?? "Unable to load Scripture reference.");
      }

      if (!statusResponse.ok) {
        throw new Error(statusPayload.error ?? "Unable to load foundation status.");
      }

      setTextUnit(versePayload);
      setStatus(statusPayload);
      setEvidence(null);
      setEvidenceOpen(false);
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
            <strong>SCRIPTURE CORE</strong>
            <small>MOONWITNESS II</small>
          </span>
        </a>

        <div className={`connection ${status?.live ? "live" : "demo"}`}>
          <span className="dot" />
          {status?.live ? "SUPABASE LIVE" : "DEMO FALLBACK"}
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">Q4Q / SCRIPTURE FOUNDATION</div>
        <h1>
          Read the source.
          <br />
          Follow the evidence.
        </h1>
        <p>
          A read-only explorer for the active corpus. Canonical text is
          kept separate from observations, morphology, external ontologies,
          claims, and interpretation.
        </p>

        <div className="hero-actions">
          <div className="lock-banner">
            <span className="lock-icon">●</span>
            <div>
              <b>Q4Q FOUNDATION — CLOSED</b>
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
            <div className="eyebrow">TEXT UNIT LOOKUP</div>
            <h2>Open a text unit</h2>
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
              aria-label="Scripture reference"
              autoComplete="off"
            />
          </div>
          <button className="read-btn" type="submit" disabled={busy}>
            {busy ? "READING…" : "READ TEXT UNIT"}
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
              <h2>{textUnit?.reference ?? "—"}</h2>
            </div>
            {textUnit?.verified ? <span className="verified">VERIFIED</span> : null}
          </div>

          <div className="unit-heading">
            <span dir="rtl">{textUnit?.surah_name_arabic ?? "—"}</span>
            <div>
              <b>{textUnit?.surah_name_transliterated ?? "—"}</b>
              <small>{textUnit?.surah_name_english ?? "—"}</small>
            </div>
          </div>

          <div className="arabic" dir="rtl" lang="ar">
            {textUnit?.text ?? "Loading canonical text…"}
          </div>

          <div className="metadata">
            {[
              ["GLOBAL", textUnit?.global_ayah_index],
              ["JUZ", textUnit?.juz],
              ["HIZB", textUnit?.hizb],
              ["QUARTER", textUnit?.hizb_quarter],
              ["MANZIL", textUnit?.manzil],
              ["RUKU", textUnit?.ruku],
              ["PAGE", textUnit?.mushaf_page],
              ["REVELATION", textUnit?.revelation_type]
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value ?? "—"}</b>
              </div>
            ))}
          </div>

          {textUnit?.checksum_sha256 ? (
            <div className="checksum">
              <span>CANONICAL SHA256</span>
              <code>{textUnit.checksum_sha256}</code>
            </div>
          ) : null}

          {textUnit?.demo ? (
            <div className="demo-note">
              Demo mode is active. Set the server-only Supabase secret to read the full live corpus.
            </div>
          ) : null}

          <div className="evidence-actions">
            <button
              type="button"
              className="evidence-btn"
              onClick={async () => {
                setEvidenceOpen(true);
                setError("");
                try {
                  const response = await fetch(
                    "/api/scripture/evidence?corpus=quran&reference=" + encodeURIComponent(textUnit?.reference ?? reference),
                    { cache: "no-store" }
                  );
                  const payload = await response.json();
                  if (!response.ok) throw new Error(payload.error ?? "Unable to load evidence.");
                  setEvidence(payload);
                } catch (cause) {
                  setError(cause instanceof Error ? cause.message : "Unable to load evidence.");
                }
              }}
            >
              {evidenceOpen ? "REFRESH EVIDENCE" : "INSPECT EVIDENCE"}
            </button>
          </div>

          {evidenceOpen ? (
            <div className="evidence-panel">
              <div className="evidence-head">
                <div>
                  <div className="eyebrow">EVIDENCE RECORDS</div>
                  <b>{evidence?.layers.length ?? 0} records anchored to this text unit</b>
                </div>
                <span className="verified">READ ONLY</span>
              </div>
              {(evidence?.layers ?? []).map((item) => (
                <div className="evidence-row" key={item.evidence_type + ":" + item.evidence_key}>
                  <div>
                    <b>{item.evidence_type}</b>
                    <small>{item.evidence_key}</small>
                  </div>
                  <span>{item.verified ? "VERIFIED" : "UNVERIFIED"}</span>
                </div>
              ))}
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
        <span>Q4Q / Scripture Foundation</span>
        <span>Supabase = data platform · Rust = deterministic engine</span>
      </footer>
    </main>
  );
}
