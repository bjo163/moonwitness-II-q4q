"use client";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="shell error-state">
      <div className="eyebrow">Q4Q / ERROR</div>
      <h1>Foundation view failed.</h1>
      <p>The read-only explorer could not complete this request.</p>
      <button className="read-btn" type="button" onClick={() => reset()}>
        RETRY
      </button>
    </main>
  );
}
