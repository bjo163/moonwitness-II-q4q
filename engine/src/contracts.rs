use serde::Serialize;
use serde_json::Value;
use uuid::Uuid;

use crate::models::{corpora, documents, sources, text_representations, text_units};

pub const API_PREFIX: &str = "api/v1";

pub const ROUTES: &[&str] = &[
    "/corpora",
    "/corpora/{id}",
    "/corpora/{corpus}/documents",
    "/documents/{id}",
    "/documents/{document_id}/units",
    "/units/{id}",
    "/units/{id}/representations",
    "/units/{id}/navigation",
    "/search",
    "/resolve",
    "/sources/{id}",
];

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct Corpus {
    pub id: Uuid,
    pub code: String,
    pub name: String,
    pub description: Option<String>,
    pub scope_note: Option<String>,
    pub active: bool,
}

impl From<corpora::Model> for Corpus {
    fn from(value: corpora::Model) -> Self {
        Self {
            id: value.id,
            code: value.code,
            name: value.name,
            description: value.description,
            scope_note: value.scope_note,
            active: value.active,
        }
    }
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct Document {
    pub id: Uuid,
    pub corpus_id: Uuid,
    pub parent_document_id: Option<Uuid>,
    pub code: String,
    pub name: String,
    pub document_type: String,
    pub sequence_no: Option<i32>,
    pub language_tag: Option<String>,
    pub description: Option<String>,
}

impl From<documents::Model> for Document {
    fn from(value: documents::Model) -> Self {
        Self {
            id: value.id,
            corpus_id: value.corpus_id,
            parent_document_id: value.parent_document_id,
            code: value.code,
            name: value.name,
            document_type: value.document_type,
            sequence_no: value.sequence_no,
            language_tag: value.language_tag,
            description: value.description,
        }
    }
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct TextUnit {
    pub id: Uuid,
    pub document_id: Uuid,
    pub parent_unit_id: Option<Uuid>,
    pub unit_type: String,
    pub reference: String,
    pub sequence_no: Option<i32>,
    pub ordinal_in_parent: Option<i32>,
    pub canonical_identifier: Option<String>,
    pub metadata: Value,
}

impl From<text_units::Model> for TextUnit {
    fn from(value: text_units::Model) -> Self {
        Self {
            id: value.id,
            document_id: value.document_id,
            parent_unit_id: value.parent_unit_id,
            unit_type: value.unit_type,
            reference: value.reference,
            sequence_no: value.sequence_no,
            ordinal_in_parent: value.ordinal_in_parent,
            canonical_identifier: value.canonical_identifier,
            metadata: value.metadata,
        }
    }
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct TextRepresentation {
    pub id: Uuid,
    pub text_unit_id: Uuid,
    pub edition_id: Option<Uuid>,
    pub translation_id: Option<Uuid>,
    pub content_role: String,
    pub language_tag: String,
    pub script_code: Option<String>,
    pub text: String,
    pub normalized_text: Option<String>,
    pub checksum_sha256: Option<String>,
    pub verified: bool,
    pub canonical: bool,
    pub metadata: Value,
}

impl From<text_representations::Model> for TextRepresentation {
    fn from(value: text_representations::Model) -> Self {
        Self {
            id: value.id,
            text_unit_id: value.text_unit_id,
            edition_id: value.edition_id,
            translation_id: value.translation_id,
            content_role: value.content_role,
            language_tag: value.language_tag,
            script_code: value.script_code,
            text: value.text,
            normalized_text: value.normalized_text,
            checksum_sha256: value.checksum_sha256,
            verified: value.verified,
            canonical: value.canonical,
            metadata: value.metadata,
        }
    }
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct Source {
    pub id: Uuid,
    pub source_type: String,
    pub name: String,
    pub uri: Option<String>,
    pub citation: Option<String>,
    pub rights: Option<String>,
    pub license: Option<String>,
    pub checksum_sha256: Option<String>,
    pub verified: bool,
    pub notes: Option<String>,
}

impl From<sources::Model> for Source {
    fn from(value: sources::Model) -> Self {
        Self {
            id: value.id,
            source_type: value.source_type,
            name: value.name,
            uri: value.uri,
            citation: value.citation,
            rights: value.rights,
            license: value.license,
            checksum_sha256: value.checksum_sha256,
            verified: value.verified,
            notes: value.notes,
        }
    }
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct Navigation {
    pub current: TextUnit,
    pub previous: Option<TextUnit>,
    pub next: Option<TextUnit>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct SearchResult {
    pub representation: TextRepresentation,
    pub unit: TextUnit,
    pub document: Document,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct SearchResponse {
    pub items: Vec<SearchResult>,
    pub limit: u64,
    pub offset: u64,
    pub count: u64,
    pub has_more: bool,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct ResolvedUnit {
    pub corpus: Corpus,
    pub document: Document,
    pub unit: TextUnit,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct ErrorBody {
    pub code: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct ErrorResponse {
    pub error: ErrorBody,
}

pub fn error_response(code: &str, message: impl Into<String>) -> ErrorResponse {
    ErrorResponse {
        error: ErrorBody {
            code: code.to_string(),
            message: message.into(),
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn route_contract_is_generic_and_stable() {
        assert!(ROUTES.contains(&"/search"));
        assert!(ROUTES.contains(&"/resolve"));
        assert!(ROUTES.iter().any(|route| route.contains("/corpora")));
        assert_eq!(API_PREFIX, "api/v1");
    }

    #[test]
    fn opaque_reference_is_not_interpreted_by_contract() {
        let reference = "node-a/section-7:leaf-b";
        let serialized = serde_json::to_value(error_response("example", reference)).unwrap();
        assert_eq!(serialized["error"]["message"], reference);
    }

    #[test]
    fn pagination_contract_exposes_has_more() {
        let response = SearchResponse {
            items: Vec::new(),
            limit: 20,
            offset: 40,
            count: 0,
            has_more: false,
        };
        assert_eq!(response.count, 0);
        assert!(!response.has_more);
    }
}
