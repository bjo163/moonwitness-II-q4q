use axum::extract::{Path, Query, State};
use loco_rs::prelude::*;
use serde::Deserialize;
use uuid::Uuid;

use crate::services::engine as service;

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
    format::json(service::list_corpora(&ctx.db).await?)
}

pub async fn get_corpus(State(ctx): State<AppContext>, Path(id): Path<String>) -> Result<Response> {
    match service::get_corpus(&ctx.db, &id).await? {
        Some(item) => format::json(item),
        None => not_found(),
    }
}

pub async fn list_documents(
    State(ctx): State<AppContext>,
    Path(corpus_id): Path<String>,
) -> Result<Response> {
    let corpus_id = parse_uuid(&corpus_id)?;
    format::json(service::list_documents(&ctx.db, corpus_id).await?)
}

pub async fn get_document(
    State(ctx): State<AppContext>,
    Path(id): Path<String>,
) -> Result<Response> {
    let id = parse_uuid(&id)?;
    match service::get_document(&ctx.db, id).await? {
        Some(item) => format::json(item),
        None => not_found(),
    }
}

pub async fn list_units(
    State(ctx): State<AppContext>,
    Path(document_id): Path<String>,
) -> Result<Response> {
    let document_id = parse_uuid(&document_id)?;
    format::json(service::list_text_units(&ctx.db, document_id).await?)
}

pub async fn get_unit(State(ctx): State<AppContext>, Path(id): Path<String>) -> Result<Response> {
    let id = parse_uuid(&id)?;
    match service::get_text_unit(&ctx.db, id).await? {
        Some(item) => format::json(item),
        None => not_found(),
    }
}

pub async fn get_representations(
    State(ctx): State<AppContext>,
    Path(id): Path<String>,
) -> Result<Response> {
    let id = parse_uuid(&id)?;
    format::json(service::get_representations(&ctx.db, id).await?)
}

pub async fn search(
    State(ctx): State<AppContext>,
    Query(params): Query<SearchQuery>,
) -> Result<Response> {
    if params.q.trim().is_empty() {
        return bad_request("q is required");
    }

    let limit = params.limit.unwrap_or(20).clamp(1, 50);
    let offset = params.offset.unwrap_or(0);

    format::json(
        service::search(
            &ctx.db,
            service::SearchParams {
                corpus: params.corpus,
                query: params.q.trim().to_string(),
                language: params.language,
                content_role: params.content_role,
                limit,
                offset,
            },
        )
        .await?,
    )
}

pub async fn navigation(
    State(ctx): State<AppContext>,
    Path(id): Path<String>,
) -> Result<Response> {
    let id = parse_uuid(&id)?;
    match service::navigation(&ctx.db, id).await? {
        Some(item) => format::json(item),
        None => not_found(),
    }
}

pub async fn resolve(
    State(ctx): State<AppContext>,
    Query(params): Query<ResolveQuery>,
) -> Result<Response> {
    if params.corpus.trim().is_empty() || params.reference.trim().is_empty() {
        return bad_request("corpus and reference are required");
    }

    match service::resolve(&ctx.db, params.corpus.trim(), params.reference.trim()).await? {
        Some(item) => format::json(item),
        None => not_found(),
    }
}

pub async fn get_source(
    State(ctx): State<AppContext>,
    Path(id): Path<String>,
) -> Result<Response> {
    let id = parse_uuid(&id)?;
    match service::get_source(&ctx.db, id).await? {
        Some(item) => format::json(item),
        None => not_found(),
    }
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/v1")
        .add("/corpora", get(list_corpora))
        .add("/corpora/{id}", get(get_corpus))
        .add("/corpora/{corpus_id}/documents", get(list_documents))
        .add("/documents/{id}", get(get_document))
        .add("/documents/{document_id}/units", get(list_units))
        .add("/units/{id}", get(get_unit))
        .add("/units/{id}/representations", get(get_representations))
        .add("/units/{id}/navigation", get(navigation))
        .add("/search", get(search))
        .add("/resolve", get(resolve))
        .add("/sources/{id}", get(get_source))
}

fn parse_uuid(raw: &str) -> Result<Uuid> {
    Uuid::parse_str(raw).map_err(|_| loco_rs::Error::string("invalid UUID"))
}
