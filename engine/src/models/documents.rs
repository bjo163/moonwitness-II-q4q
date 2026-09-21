use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "documents")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
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

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::corpora::Entity",
        from = "Column::CorpusId",
        to = "super::corpora::Column::Id"
    )]
    Corpus,
}

impl Related<super::corpora::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Corpus.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
