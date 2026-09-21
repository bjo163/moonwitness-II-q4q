//! Q4Q deterministic evaluation engine.
//!
//! This crate is intentionally small at the Quran Core stage.
//! It must consume verified evidence and never mutate canonical Quran data.

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EvidenceRef {
    pub evidence_id: String,
    pub evidence_type: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EvaluationRequest {
    pub target: EvidenceRef,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EvaluationResult {
    pub engine_version: String,
    pub status: String,
}

/// Placeholder for the future deterministic evaluator.
///
/// The Quran Core is currently closed; evaluation rules belong to a later
/// layer and must consume evidence without modifying the source corpus.
pub fn evaluate(_request: EvaluationRequest) -> EvaluationResult {
    EvaluationResult {
        engine_version: env!("CARGO_PKG_VERSION").to_string(),
        status: "ENGINE_BOUNDARY_READY".to_string(),
    }
}
