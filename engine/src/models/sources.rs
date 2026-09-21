use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "sources")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
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

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
