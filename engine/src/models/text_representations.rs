use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "text_representations")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
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
    pub metadata: Json,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::text_units::Entity",
        from = "Column::TextUnitId",
        to = "super::text_units::Column::Id"
    )]
    TextUnit,
}

impl Related<super::text_units::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::TextUnit.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
