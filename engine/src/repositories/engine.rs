use loco_rs::Result;
use sea_orm::{
    ColumnTrait, Condition, DatabaseConnection, EntityTrait, QueryFilter, QueryOrder, QuerySelect,
};
use uuid::Uuid;

use crate::models::{corpora, documents, sources, text_representations, text_units};

pub async fn list_corpora(db: &DatabaseConnection) -> Result<Vec<corpora::Model>> {
    Ok(corpora::Entity::find()
        .filter(corpora::Column::Active.eq(true))
        .order_by_asc(corpora::Column::Code)
        .all(db)
        .await?)
}

pub async fn get_corpus(
    db: &DatabaseConnection,
    id_or_code: &str,
) -> Result<Option<corpora::Model>> {
    if let Ok(id) = Uuid::parse_str(id_or_code) {
        return Ok(corpora::Entity::find_by_id(id).one(db).await?);
    }

    Ok(corpora::Entity::find()
        .filter(corpora::Column::Code.eq(id_or_code))
        .filter(corpora::Column::Active.eq(true))
        .one(db)
        .await?)
}

pub async fn list_documents(
    db: &DatabaseConnection,
    corpus_id: Uuid,
) -> Result<Vec<documents::Model>> {
    Ok(documents::Entity::find()
        .filter(documents::Column::CorpusId.eq(corpus_id))
        .order_by_asc(documents::Column::SequenceNo)
        .order_by_asc(documents::Column::Code)
        .all(db)
        .await?)
}

pub async fn get_document(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<documents::Model>> {
    Ok(documents::Entity::find_by_id(id).one(db).await?)
}

pub async fn list_text_units(
    db: &DatabaseConnection,
    document_id: Uuid,
) -> Result<Vec<text_units::Model>> {
    Ok(text_units::Entity::find()
        .filter(text_units::Column::DocumentId.eq(document_id))
        .order_by_asc(text_units::Column::SequenceNo)
        .order_by_asc(text_units::Column::OrdinalInParent)
        .all(db)
        .await?)
}

pub async fn get_text_unit(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<text_units::Model>> {
    Ok(text_units::Entity::find_by_id(id).one(db).await?)
}

pub async fn get_representations(
    db: &DatabaseConnection,
    text_unit_id: Uuid,
) -> Result<Vec<text_representations::Model>> {
    Ok(text_representations::Entity::find()
        .filter(text_representations::Column::TextUnitId.eq(text_unit_id))
        .filter(text_representations::Column::Verified.eq(true))
        .order_by_desc(text_representations::Column::Canonical)
        .order_by_asc(text_representations::Column::LanguageTag)
        .all(db)
        .await?)
}

pub async fn get_source(
    db: &DatabaseConnection,
    id: Uuid,
) -> Result<Option<sources::Model>> {
    Ok(sources::Entity::find_by_id(id).one(db).await?)
}

pub async fn search_representations(
    db: &DatabaseConnection,
    corpus_code: Option<&str>,
    query: &str,
    language: Option<&str>,
    content_role: Option<&str>,
    limit: u64,
    offset: u64,
) -> Result<Vec<text_representations::Model>> {
    let mut selector = text_representations::Entity::find()
        .inner_join(text_units::Entity)
        .inner_join(documents::Entity)
        .inner_join(corpora::Entity)
        .filter(text_representations::Column::Verified.eq(true))
        .filter(
            Condition::any()
                .add(text_representations::Column::Text.contains(query))
                .add(text_representations::Column::NormalizedText.contains(query)),
        )
        .order_by_asc(text_units::Column::SequenceNo)
        .limit(limit)
        .offset(offset);

    if let Some(corpus_code) = corpus_code {
        selector = selector.filter(corpora::Column::Code.eq(corpus_code));
    }

    if let Some(language) = language {
        selector = selector.filter(text_representations::Column::LanguageTag.eq(language));
    }

    if let Some(content_role) = content_role {
        selector = selector.filter(text_representations::Column::ContentRole.eq(content_role));
    }

    Ok(selector.all(db).await?)
}

pub async fn previous(
    db: &DatabaseConnection,
    current: &text_units::Model,
) -> Result<Option<text_units::Model>> {
    let Some(sequence_no) = current.sequence_no else {
        return Ok(None);
    };

    Ok(text_units::Entity::find()
        .filter(text_units::Column::DocumentId.eq(current.document_id))
        .filter(text_units::Column::SequenceNo.lt(sequence_no))
        .order_by_desc(text_units::Column::SequenceNo)
        .one(db)
        .await?)
}

pub async fn next(
    db: &DatabaseConnection,
    current: &text_units::Model,
) -> Result<Option<text_units::Model>> {
    let Some(sequence_no) = current.sequence_no else {
        return Ok(None);
    };

    Ok(text_units::Entity::find()
        .filter(text_units::Column::DocumentId.eq(current.document_id))
        .filter(text_units::Column::SequenceNo.gt(sequence_no))
        .order_by_asc(text_units::Column::SequenceNo)
        .one(db)
        .await?)
}

pub async fn resolve(
    db: &DatabaseConnection,
    corpus_id: Uuid,
    reference: &str,
) -> Result<Option<(corpora::Model, documents::Model, text_units::Model)>> {
    let Some(unit) = text_units::Entity::find()
        .inner_join(documents::Entity)
        .filter(documents::Column::CorpusId.eq(corpus_id))
        .filter(text_units::Column::Reference.eq(reference))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    let Some(document) = get_document(db, unit.document_id).await? else {
        return Ok(None);
    };

    let Some(corpus) = corpora::Entity::find_by_id(corpus_id).one(db).await? else {
        return Ok(None);
    };

    Ok(Some((corpus, document, unit)))
}
