use loco_rs::Result;
use sea_orm::DatabaseConnection;
use serde::Serialize;
use uuid::Uuid;

use crate::{
    models::{corpora, documents, sources, text_representations, text_units},
    repositories::engine as repo,
};

#[derive(Debug, Clone)]
pub struct SearchParams {
    pub corpus: Option<String>,
    pub query: String,
    pub language: Option<String>,
    pub content_role: Option<String>,
    pub limit: u64,
    pub offset: u64,
}

#[derive(Debug, Serialize)]
pub struct Navigation {
    pub current: text_units::Model,
    pub previous: Option<text_units::Model>,
    pub next: Option<text_units::Model>,
}

#[derive(Debug, Serialize)]
pub struct SearchResult {
    pub representation: text_representations::Model,
    pub unit: text_units::Model,
    pub document: documents::Model,
}

#[derive(Debug, Serialize)]
pub struct SearchResponse {
    pub items: Vec<SearchResult>,
    pub limit: u64,
    pub offset: u64,
    pub count: u64,
    pub has_more: bool,
}

#[derive(Debug, Serialize)]
pub struct ResolvedUnit {
    pub corpus: corpora::Model,
    pub document: documents::Model,
    pub unit: text_units::Model,
}

pub async fn list_corpora(db: &DatabaseConnection) -> Result<Vec<corpora::Model>> {
    repo::list_corpora(db).await
}

pub async fn get_corpus(
    db: &DatabaseConnection,
    id_or_code: &str,
) -> Result<Option<corpora::Model>> {
    repo::get_corpus(db, id_or_code).await
}

pub async fn list_documents(
    db: &DatabaseConnection,
    corpus_id: Uuid,
) -> Result<Vec<documents::Model>> {
    repo::list_documents(db, corpus_id).await
}

pub async fn get_document(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<documents::Model>> {
    repo::get_document(db, id).await
}

pub async fn list_text_units(
    db: &DatabaseConnection,
    document_id: Uuid,
) -> Result<Vec<text_units::Model>> {
    repo::list_text_units(db, document_id).await
}

pub async fn get_text_unit(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<text_units::Model>> {
    repo::get_text_unit(db, id).await
}

pub async fn get_representations(
    db: &DatabaseConnection,
    text_unit_id: Uuid,
) -> Result<Vec<text_representations::Model>> {
    repo::get_representations(db, text_unit_id).await
}

pub async fn get_source(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<sources::Model>> {
    repo::get_source(db, id).await
}

pub async fn search(
    db: &DatabaseConnection,
    params: SearchParams,
) -> Result<SearchResponse> {
    let requested = params.limit;
    let fetch_limit = requested.saturating_add(1);

    let reps = repo::search_representations(
        db,
        params.corpus.as_deref(),
        &params.query,
        params.language.as_deref(),
        params.content_role.as_deref(),
        fetch_limit,
        params.offset,
    )
    .await?;

    let has_more = reps.len() > requested as usize;
    let mut items = Vec::with_capacity(reps.len().min(requested as usize));

    for representation in reps.into_iter().take(requested as usize) {
        let Some(unit) = repo::get_text_unit(db, representation.text_unit_id).await? else {
            continue;
        };
        let Some(document) = repo::get_document(db, unit.document_id).await? else {
            continue;
        };

        items.push(SearchResult {
            representation,
            unit,
            document,
        });
    }

    Ok(SearchResponse {
        count: items.len() as u64,
        items,
        limit: requested,
        offset: params.offset,
        has_more,
    })
}

pub async fn navigation(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<Navigation>> {
    let Some(current) = repo::get_text_unit(db, id).await? else {
        return Ok(None);
    };

    Ok(Some(Navigation {
        previous: repo::previous(db, &current).await?,
        next: repo::next(db, &current).await?,
        current,
    }))
}

pub async fn resolve(
    db: &DatabaseConnection,
    corpus_code: &str,
    reference: &str,
) -> Result<Option<ResolvedUnit>> {
    let Some(corpus) = repo::get_corpus(db, corpus_code).await? else {
        return Ok(None);
    };

    let Some((corpus, document, unit)) = repo::resolve(db, corpus.id, reference).await? else {
        return Ok(None);
    };

    Ok(Some(ResolvedUnit {
        corpus,
        document,
        unit,
    }))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn requested_page_size_never_overflows() {
        let requested = u64::MAX;
        assert_eq!(requested.saturating_add(1), u64::MAX);
    }
}
