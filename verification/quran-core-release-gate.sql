-- QURAN_CORE_V1 release gate. Audit-only.
with checks as (
  select
    (select count(*) from quran_evidence_spine)=6236 as ayah_spine_6236,
    (select count(*) from quran_evidence_spine where canonical_count=1 and structural_count=1 and observation_count=1 and lexical_count=1 and morphology_count=1)=6236 as complete_spine_6236,
    (select count(*) from quran_evidence_spine where canonical_count<>1 or structural_count<>1 or observation_count<>1 or lexical_count<>1 or morphology_count<>1)=0 as incomplete_spine_0,
    (select count(*) from quran_evidence_records)=37851 as evidence_37851,
    (select count(*) from quran_evidence_records where verified)=37851 as evidence_verified,
    (select count(*) from quran_evidence_crossrefs)=24394 as crossrefs_24394,
    (select count(*) from quran_evidence_crossrefs where verified)=24394 as crossrefs_verified,
    (select count(*) from quran_evidence_records where text_unit_id is not null and not exists(select 1 from text_units t where t.id=quran_evidence_records.text_unit_id))=0 as broken_record_refs_0,
    (select count(*) from quran_evidence_crossrefs cr where not exists(select 1 from quran_evidence_records r where r.id=cr.from_evidence_id) or not exists(select 1 from quran_evidence_records r where r.id=cr.to_evidence_id))=0 as broken_crossrefs_0,
    (select checksum_sha256 from editions where identifier='tanzil-uthmani-1.1')='b9027e22eb7e69d326f1eb7467fed8b7bc1eccbe1a894887ed2b3feb4ef5fc90' as canonical_hash,
    (select checksum_sha256 from editions where identifier='kemenag-translation-2019')='b67295903e3dcffa08d221a811847841729936487ff5a1bf82278cb7eab62436' as translation_hash,
    (select count(*) from text_representations)=31180 as representations_31180,
    (select count(*) from text_representations where verified and nullif(btrim(text),'') is not null)=31180 as representations_verified_nonblank,
    (select count(*) from quran_semantic_concept_occurrences where verified)=5686 as semantic_occurrences_5686,
    (select count(*) from quran_qa_ontology_edges where verified)=985 as qa_edges_985
)
select *, (
  ayah_spine_6236 and complete_spine_6236 and incomplete_spine_0 and
  evidence_37851 and evidence_verified and crossrefs_24394 and crossrefs_verified and
  broken_record_refs_0 and broken_crossrefs_0 and canonical_hash and translation_hash and
  representations_31180 and representations_verified_nonblank and
  semantic_occurrences_5686 and qa_edges_985
) as overall_pass
from checks;
