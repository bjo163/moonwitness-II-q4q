use q4q_engine::contracts::{
    self, Corpus, Document, ErrorResponse, SearchResponse, TextRepresentation, TextUnit,
};
use serde_json::json;
use uuid::Uuid;

#[test]
fn contract_serialization_keeps_generic_shape() {
    let corpus_id = Uuid::from_u128(1);
    let document_id = Uuid::from_u128(2);
    let unit_id = Uuid::from_u128(3);
    let representation_id = Uuid::from_u128(4);

    let document = Document {
        id: document_id,
        corpus_id,
        parent_document_id: None,
        code: "doc-01".to_string(),
        name: "Document One".to_string(),
        document_type: "primary".to_string(),
        sequence_no: Some(1),
        language_tag: Some("xx".to_string()),
        description: None,
    };

    let unit = TextUnit {
        id: unit_id,
        document_id,
        parent_unit_id: None,
        unit_type: "unit".to_string(),
        reference: "node-a/section-7:leaf-b".to_string(),
        sequence_no: Some(7),
        ordinal_in_parent: Some(1),
        canonical_identifier: None,
        metadata: json!({"fixture": true}),
    };

    let representation = TextRepresentation {
        id: representation_id,
        text_unit_id: unit_id,
        edition_id: None,
        translation_id: None,
        content_role: "primary".to_string(),
        language_tag: "xx".to_string(),
        script_code: None,
        text: "sample text".to_string(),
        normalized_text: Some("sample text".to_string()),
        checksum_sha256: None,
        verified: true,
        canonical: true,
        metadata: json!({}),
    };

    let result = contracts::SearchResult {
        representation,
        unit,
        document,
    };

    let response = SearchResponse {
        items: vec![result],
        limit: 20,
        offset: 0,
        count: 1,
        has_more: false,
    };

    let value = serde_json::to_value(response).expect("serializable");
    assert_eq!(value["count"], 1);
    assert_eq!(value["has_more"], false);
    assert_eq!(
        value["items"][0]["unit"]["reference"],
        "node-a/section-7:leaf-b"
    );
    assert_eq!(value["items"][0]["document"]["code"], "doc-01");
    assert_eq!(value["items"][0]["representation"]["verified"], true);
}

#[test]
fn error_contract_is_machine_readable() {
    let error = ErrorResponse {
        error: contracts::ErrorBody {
            code: "not_found".to_string(),
            message: "resource not found".to_string(),
        },
    };

    let value = serde_json::to_value(error).expect("serializable");
    assert_eq!(value["error"]["code"], "not_found");
    assert_eq!(value["error"]["message"], "resource not found");
}

#[test]
fn route_contract_covers_all_registered_api_groups() {
    let routes = contracts::ROUTES;

    assert_eq!(routes.len(), 11);
    assert!(routes.iter().any(|route| route.ends_with("/search")));
    assert!(routes.iter().any(|route| route.ends_with("/resolve")));
    assert!(routes.iter().any(|route| route.contains("representations")));
    assert!(routes.iter().any(|route| route.contains("navigation")));
}
