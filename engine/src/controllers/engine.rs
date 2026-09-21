use axum::{
    Json,
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
};
use loco_rs::prelude::*;
use serde::Deserialize;
use uuid::Uuid;

use crate::{contracts, services::engine as service};

const MAX_QUERY_LENGTH: usize = 256;
const MAX_REFERENCE_LENGTH: usize = 512;
const MAX_OFFSET: u64 = 1_000_000;

#[derive(Debug, Deserialize)]
pub struct SearchQuery {
    pub corpus: Option<String>,
    pub q: String,
    pub language: Option<String>,
    pub content_role: Option<String>,
    pub limit: Option<u64>,
    pub offset: Option<u64>,
}

#[derive(Debug, Deserialize)]
pub struct ResolveQuery {
    pub corpus: String,
    pub reference: String,
}

pub async fn list_corpora(State(ctx): State<AppContext>) -> Result<Response> {
    let items = service::list_corpora(&ctx.db)
        .await?
        .into_iter()
        .map(contracts::Corpus::from)
        .collect::<Vec<_>>();

    format::json(items)
}

pub async fn get_corpus(State(ctx): State<AppContext>, Path(id): Path<String>) -> Result<Response> {
    match service::get_corpus(&ctx.db, &id).await? {
        Some(item) => format::json(contracts::Corpus::from(item)),
        None => not_found_response("corpus not found"),
    }
}

pub async fn list_documents(
    State(ctx): State<AppContext>,
    Path(corpus): Path<String>,
) -> Result<Response> {
    let Some(corpus) = service::get_corpus(&ctx.db, corpus.trim()).await? else {
        return not_found_response("corpus not found");
    };

    let items = service::list_documents(&ctx.db, corpus.id)
        .await?
        .into_iter()
        .map(contracts::Document::from)
        .collect::<Vec<_>>();

    format::json(items)
}

pub async fn get_document(
    State(ctx): State<AppContext>,
    Path(id): Path<String>,
) -> Result<Response> {
    let Some(id) = parse_uuid(&id) else {
        return bad_request_response("invalid document id");
    };

    match service::get_document(&ctx.db, id).await? {
        Some(item) => format::json(contracts::Document::from(item)),
        None => not_found_response("document not found"),
    }
}

pub async fn list_units(
    State(ctx): State<AppContext>,
    Path(document_id): Path<String>,
) -> Result<Response> {
    let Some(document_id) = parse_uuid(&document_id) else {
        return bad_request_response("invalid document id");
    };

    let items = service::list_text_units(&ctx.db, document_id)
        .await?
        .into_iter()
        .map(contracts::TextUnit::from)
        .collect::<Vec<_>>();

    format::json(items)
}

pub async fn get_unit(State(ctx): State<AppContext>, Path(id): Path<String>) -> Result<Response> {
    let Some(id) = parse_uuid(&id) else {
        return bad_request_response("invalid unit id");
    };

    match service::get_text_unit(&ctx.db, id).await? {
        Some(item) => format::json(contracts::TextUnit::from(item)),
        None => not_found_response("text unit not found"),
    }
}

pub async fn get_representations(
    State(ctx): State<AppContext>,
    Path(id): Path<String>,
) -> Result<Response> {
    let Some(id) = parse_uuid(&id) else {
        return bad_request_response("invalid unit id");
    };

    let items = service::get_representations(&ctx.db, id)
        .await?
        .into_iter()
        .map(contracts::TextRepresentation::from)
        .collect::<Vec<_>>();

    format::json(items)
}

pub async fn search(
    State(ctx): State<AppContext>,
    Query(params): Query<SearchQuery>,
) -> Result<Response> {
    let query = params.q.trim();
    if query.is_empty() {
        return bad_request_response("q is required");
    }
    if query.chars().count() > MAX_QUERY_LENGTH {
        return bad_request_response("q is too long");
    }

    let corpus = params.corpus.and_then(|value| {
        let value = value.trim().to_string();
        (!value.is_empty()).then_some(value)
    });
    let language = params.language.and_then(|value| {
        let value = value.trim().to_string();
        (!value.is_empty()).then_some(value)
    });
    let content_role = params.content_role.and_then(|value| {
        let value = value.trim().to_string();
        (!value.is_empty()).then_some(value)
    });
    let limit = params.limit.unwrap_or(20).clamp(1, 50);
    let offset = params.offset.unwrap_or(0).min(MAX_OFFSET);

    let response = service::search(
        &ctx.db,
        service::SearchParams {
            corpus,
            query: query.to_string(),
            language,
            content_role,
            limit,
            offset,
        },
    )
    .await?;

    let response = contracts::SearchResponse {
        items: response
            .items
            .into_iter()
            .map(|item| contracts::SearchResult {
                representation: item.representation.into(),
                unit: item.unit.into(),
                document: item.document.into(),
            })
            .collect(),
        limit: response.limit,
        offset: response.offset,
        count: response.count,
        has_more: response.has_more,
    };

    format::json(response)
}

pub async fn navigation(State(ctx): State<AppContext>, Path(id): Path<String>) -> Result<Response> {
    let Some(id) = parse_uuid(&id) else {
        return bad_request_response("invalid unit id");
    };

    match service::navigation(&ctx.db, id).await? {
        Some(item) => format::json(contracts::Navigation {
            current: item.current.into(),
            previous: item.previous.map(Into::into),
            next: item.next.map(Into::into),
        }),
        None => not_found_response("text unit not found"),
    }
}

pub async fn resolve(
    State(ctx): State<AppContext>,
    Query(params): Query<ResolveQuery>,
) -> Result<Response> {
    let corpus = params.corpus.trim();
    let reference = params.reference.trim();

    if corpus.is_empty() {
        return bad_request_response("corpus is required");
    }
    if reference.is_empty() {
        return bad_request_response("reference is required");
    }
    if reference.chars().count() > MAX_REFERENCE_LENGTH {
        return bad_request_response("reference is too long");
    }

    match service::resolve(&ctx.db, corpus, reference).await? {
        Some(item) => format::json(contracts::ResolvedUnit {
            corpus: item.corpus.into(),
            document: item.document.into(),
            unit: item.unit.into(),
        }),
        None => not_found_response("text unit not found"),
    }
}

pub async fn get_source(State(ctx): State<AppContext>, Path(id): Path<String>) -> Result<Response> {
    let Some(id) = parse_uuid(&id) else {
        return bad_request_response("invalid source id");
    };

    match service::get_source(&ctx.db, id).await? {
        Some(item) => format::json(contracts::Source::from(item)),
        None => not_found_response("source not found"),
    }
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix(contracts::API_PREFIX)
        .add("/corpora", get(list_corpora))
        .add("/corpora/{id}", get(get_corpus))
        .add("/corpora/{corpus}/documents", get(list_documents))
        .add("/documents/{id}", get(get_document))
        .add("/documents/{document_id}/units", get(list_units))
        .add("/units/{id}", get(get_unit))
        .add("/units/{id}/representations", get(get_representations))
        .add("/units/{id}/navigation", get(navigation))
        .add("/search", get(search))
        .add("/resolve", get(resolve))
        .add("/sources/{id}", get(get_source))
}

fn parse_uuid(raw: &str) -> Option<Uuid> {
    Uuid::parse_str(raw).ok()
}

fn bad_request_response(message: impl Into<String>) -> Result<Response> {
    Ok((
        StatusCode::BAD_REQUEST,
        Json(contracts::error_response("bad_request", message)),
    )
        .into_response())
}

fn not_found_response(message: impl Into<String>) -> Result<Response> {
    Ok((
        StatusCode::NOT_FOUND,
        Json(contracts::error_response("not_found", message)),
    )
        .into_response())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn uuid_parser_rejects_non_uuid_values() {
        assert!(parse_uuid("not-a-uuid").is_none());
    }

    #[test]
    fn uuid_parser_accepts_valid_values() {
        assert!(parse_uuid("00000000-0000-0000-0000-000000000001").is_some());
    }
}
