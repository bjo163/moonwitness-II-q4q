export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_evidence: {
        Row: {
          citation: string | null
          confidence: number | null
          created_at: string
          evidence_type: string
          excerpt: string | null
          external_source_id: string | null
          id: string
          rationale: string | null
          relation_type: string
          text_representation_id: string | null
          tradition_activity_id: string
        }
        Insert: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          evidence_type: string
          excerpt?: string | null
          external_source_id?: string | null
          id?: string
          rationale?: string | null
          relation_type: string
          text_representation_id?: string | null
          tradition_activity_id: string
        }
        Update: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          evidence_type?: string
          excerpt?: string | null
          external_source_id?: string | null
          id?: string
          rationale?: string | null
          relation_type?: string
          text_representation_id?: string | null
          tradition_activity_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_evidence_external_source_id_fkey"
            columns: ["external_source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_evidence_text_representation_id_fkey"
            columns: ["text_representation_id"]
            isOneToOne: false
            referencedRelation: "text_representations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_evidence_tradition_activity_id_fkey"
            columns: ["tradition_activity_id"]
            isOneToOne: false
            referencedRelation: "tradition_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          agent_type: string
          created_at: string
          external_identifier: string | null
          id: string
          name: string
          notes: string | null
          uri: string | null
        }
        Insert: {
          agent_type: string
          created_at?: string
          external_identifier?: string | null
          id?: string
          name: string
          notes?: string | null
          uri?: string | null
        }
        Update: {
          agent_type?: string
          created_at?: string
          external_identifier?: string | null
          id?: string
          name?: string
          notes?: string | null
          uri?: string | null
        }
        Relationships: []
      }
      annotations: {
        Row: {
          agent_id: string | null
          annotation_text: string | null
          annotation_type: string
          confidence: number | null
          created_at: string
          epistemic_type: string
          id: string
          label: string
          metadata: Json
          method: string | null
          scope_code: string
          source_id: string | null
          status: string
          text_unit_id: string
        }
        Insert: {
          agent_id?: string | null
          annotation_text?: string | null
          annotation_type: string
          confidence?: number | null
          created_at?: string
          epistemic_type?: string
          id?: string
          label: string
          metadata?: Json
          method?: string | null
          scope_code?: string
          source_id?: string | null
          status?: string
          text_unit_id: string
        }
        Update: {
          agent_id?: string | null
          annotation_text?: string | null
          annotation_type?: string
          confidence?: number | null
          created_at?: string
          epistemic_type?: string
          id?: string
          label?: string
          metadata?: Json
          method?: string | null
          scope_code?: string
          source_id?: string | null
          status?: string
          text_unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "annotations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "annotations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      corpora: {
        Row: {
          active: boolean
          canonical_order: number | null
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          scope_note: string | null
          tradition_branch_id: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          canonical_order?: number | null
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          scope_note?: string | null
          tradition_branch_id?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          canonical_order?: number | null
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          scope_note?: string | null
          tradition_branch_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpora_tradition_branch_id_fkey"
            columns: ["tradition_branch_id"]
            isOneToOne: false
            referencedRelation: "tradition_branches"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          code: string
          corpus_id: string
          created_at: string
          description: string | null
          document_type: string
          id: string
          language_tag: string | null
          name: string
          parent_document_id: string | null
          sequence_no: number | null
        }
        Insert: {
          code: string
          corpus_id: string
          created_at?: string
          description?: string | null
          document_type: string
          id?: string
          language_tag?: string | null
          name: string
          parent_document_id?: string | null
          sequence_no?: number | null
        }
        Update: {
          code?: string
          corpus_id?: string
          created_at?: string
          description?: string | null
          document_type?: string
          id?: string
          language_tag?: string | null
          name?: string
          parent_document_id?: string | null
          sequence_no?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_corpus_id_fkey"
            columns: ["corpus_id"]
            isOneToOne: false
            referencedRelation: "corpora"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_parent_document_id_fkey"
            columns: ["parent_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      edition_sources: {
        Row: {
          citation: string | null
          confidence: number | null
          created_at: string
          edition_id: string
          external_identifier: string | null
          id: string
          is_primary: boolean
          notes: string | null
          relation_type: string
          retrieved_at: string | null
          source_id: string
          verified: boolean
        }
        Insert: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          edition_id: string
          external_identifier?: string | null
          id?: string
          is_primary?: boolean
          notes?: string | null
          relation_type: string
          retrieved_at?: string | null
          source_id: string
          verified?: boolean
        }
        Update: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          edition_id?: string
          external_identifier?: string | null
          id?: string
          is_primary?: boolean
          notes?: string | null
          relation_type?: string
          retrieved_at?: string | null
          source_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "edition_sources_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "edition_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      editions: {
        Row: {
          checksum_sha256: string | null
          created_at: string
          date_published: string | null
          date_retrieved: string | null
          document_id: string | null
          edition_type: string
          id: string
          identifier: string | null
          is_public_domain: boolean | null
          language_tag: string | null
          license: string | null
          notes: string | null
          publisher_agent_id: string | null
          rights: string | null
          title: string
          verified: boolean
          version: string | null
        }
        Insert: {
          checksum_sha256?: string | null
          created_at?: string
          date_published?: string | null
          date_retrieved?: string | null
          document_id?: string | null
          edition_type: string
          id?: string
          identifier?: string | null
          is_public_domain?: boolean | null
          language_tag?: string | null
          license?: string | null
          notes?: string | null
          publisher_agent_id?: string | null
          rights?: string | null
          title: string
          verified?: boolean
          version?: string | null
        }
        Update: {
          checksum_sha256?: string | null
          created_at?: string
          date_published?: string | null
          date_retrieved?: string | null
          document_id?: string | null
          edition_type?: string
          id?: string
          identifier?: string | null
          is_public_domain?: boolean | null
          language_tag?: string | null
          license?: string | null
          notes?: string | null
          publisher_agent_id?: string | null
          rights?: string | null
          title?: string
          verified?: boolean
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "editions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editions_publisher_agent_id_fkey"
            columns: ["publisher_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_evidence: {
        Row: {
          activity_evidence_id: string | null
          contribution: Json | null
          created_at: string
          evaluation_id: string
          id: string
          principle_evidence_id: string | null
          weight: number | null
        }
        Insert: {
          activity_evidence_id?: string | null
          contribution?: Json | null
          created_at?: string
          evaluation_id: string
          id?: string
          principle_evidence_id?: string | null
          weight?: number | null
        }
        Update: {
          activity_evidence_id?: string | null
          contribution?: Json | null
          created_at?: string
          evaluation_id?: string
          id?: string
          principle_evidence_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_evidence_activity_evidence_id_fkey"
            columns: ["activity_evidence_id"]
            isOneToOne: false
            referencedRelation: "activity_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_evidence_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_evidence_principle_evidence_id_fkey"
            columns: ["principle_evidence_id"]
            isOneToOne: false
            referencedRelation: "principle_evidence"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_runs: {
        Row: {
          completed_at: string | null
          evaluator_version: string
          id: string
          input_snapshot: Json | null
          result_snapshot: Json | null
          rubric_id: string
          run_key: string
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          evaluator_version: string
          id?: string
          input_snapshot?: Json | null
          result_snapshot?: Json | null
          rubric_id: string
          run_key: string
          started_at?: string
          status: string
        }
        Update: {
          completed_at?: string | null
          evaluator_version?: string
          id?: string
          input_snapshot?: Json | null
          result_snapshot?: Json | null
          rubric_id?: string
          run_key?: string
          started_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_runs_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "q4q_rubrics"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluations: {
        Row: {
          created_at: string
          evaluated_at: string | null
          evaluator_version: string
          id: string
          q1_score: number | null
          q2_score: number | null
          q3_score: number | null
          q4_score: number | null
          reasoning: Json | null
          rubric_id: string
          status: string
          total_score: number | null
          tradition_activity_id: string
        }
        Insert: {
          created_at?: string
          evaluated_at?: string | null
          evaluator_version: string
          id?: string
          q1_score?: number | null
          q2_score?: number | null
          q3_score?: number | null
          q4_score?: number | null
          reasoning?: Json | null
          rubric_id: string
          status: string
          total_score?: number | null
          tradition_activity_id: string
        }
        Update: {
          created_at?: string
          evaluated_at?: string | null
          evaluator_version?: string
          id?: string
          q1_score?: number | null
          q2_score?: number | null
          q3_score?: number | null
          q4_score?: number | null
          reasoning?: Json | null
          rubric_id?: string
          status?: string
          total_score?: number | null
          tradition_activity_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "q4q_rubrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_tradition_activity_id_fkey"
            columns: ["tradition_activity_id"]
            isOneToOne: false
            referencedRelation: "tradition_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      foundation_locks: {
        Row: {
          certification: string
          created_at: string
          id: string
          locked_at: string
          notes: string | null
          scope_code: string
          scope_type: string
          snapshot: Json
          status: string
        }
        Insert: {
          certification: string
          created_at?: string
          id?: string
          locked_at?: string
          notes?: string | null
          scope_code: string
          scope_type: string
          snapshot?: Json
          status: string
        }
        Update: {
          certification?: string
          created_at?: string
          id?: string
          locked_at?: string
          notes?: string | null
          scope_code?: string
          scope_type?: string
          snapshot?: Json
          status?: string
        }
        Relationships: []
      }
      principle_evidence: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          principle_id: string
          rationale: string | null
          relation_type: string
          text_representation_id: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          principle_id: string
          rationale?: string | null
          relation_type: string
          text_representation_id?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          principle_id?: string
          rationale?: string | null
          relation_type?: string
          text_representation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "principle_evidence_principle_id_fkey"
            columns: ["principle_id"]
            isOneToOne: false
            referencedRelation: "principles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "principle_evidence_text_representation_id_fkey"
            columns: ["text_representation_id"]
            isOneToOne: false
            referencedRelation: "text_representations"
            referencedColumns: ["id"]
          },
        ]
      }
      principles: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string
          id: string
          name: string
          scope: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description: string
          id?: string
          name: string
          scope?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          scope?: string
        }
        Relationships: []
      }
      q4q_rubrics: {
        Row: {
          acceptable_core_threshold: number
          acceptable_total_threshold: number
          active: boolean
          aligned_core_threshold: number
          aligned_total_threshold: number
          code: string
          created_at: string
          critical_threshold: number
          id: string
          max_per_core: number
          max_total: number
          q1_name: string
          q2_name: string
          q3_name: string
          q4_name: string
          version: string
        }
        Insert: {
          acceptable_core_threshold?: number
          acceptable_total_threshold?: number
          active?: boolean
          aligned_core_threshold?: number
          aligned_total_threshold?: number
          code: string
          created_at?: string
          critical_threshold?: number
          id?: string
          max_per_core?: number
          max_total?: number
          q1_name: string
          q2_name: string
          q3_name: string
          q4_name: string
          version: string
        }
        Update: {
          acceptable_core_threshold?: number
          acceptable_total_threshold?: number
          active?: boolean
          aligned_core_threshold?: number
          aligned_total_threshold?: number
          code?: string
          created_at?: string
          critical_threshold?: number
          id?: string
          max_per_core?: number
          max_total?: number
          q1_name?: string
          q2_name?: string
          q3_name?: string
          q4_name?: string
          version?: string
        }
        Relationships: []
      }
      quran_annotation_taxonomy: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string
          name: string
          notes: string | null
          requires_source: boolean
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description: string
          name: string
          notes?: string | null
          requires_source?: boolean
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string
          name?: string
          notes?: string | null
          requires_source?: boolean
        }
        Relationships: []
      }
      quran_evidence_crossrefs: {
        Row: {
          created_at: string
          from_evidence_id: string
          id: string
          relation_code: string
          text_unit_id: string
          to_evidence_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          from_evidence_id: string
          id?: string
          relation_code: string
          text_unit_id: string
          to_evidence_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          from_evidence_id?: string
          id?: string
          relation_code?: string
          text_unit_id?: string
          to_evidence_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_evidence_crossrefs_from_evidence_id_fkey"
            columns: ["from_evidence_id"]
            isOneToOne: false
            referencedRelation: "quran_evidence_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_evidence_crossrefs_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_evidence_crossrefs_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_evidence_crossrefs_to_evidence_id_fkey"
            columns: ["to_evidence_id"]
            isOneToOne: false
            referencedRelation: "quran_evidence_records"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_evidence_records: {
        Row: {
          checksum_sha256: string | null
          created_at: string
          evidence_key: string
          evidence_type: string
          id: string
          method: string
          payload: Json
          source_id: string
          source_locator: string | null
          source_version: string
          text_unit_id: string | null
          verified: boolean
        }
        Insert: {
          checksum_sha256?: string | null
          created_at?: string
          evidence_key: string
          evidence_type: string
          id?: string
          method: string
          payload?: Json
          source_id: string
          source_locator?: string | null
          source_version: string
          text_unit_id?: string | null
          verified?: boolean
        }
        Update: {
          checksum_sha256?: string | null
          created_at?: string
          evidence_key?: string
          evidence_type?: string
          id?: string
          method?: string
          payload?: Json
          source_id?: string
          source_locator?: string | null
          source_version?: string
          text_unit_id?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_evidence_records_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_evidence_records_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_evidence_records_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_evidence_runs: {
        Row: {
          broken_crossref_refs: number
          broken_record_text_refs: number
          code: string
          created_at: string
          crossref_count: number
          crossref_sha256: string
          evidence_record_count: number
          evidence_sha256: string
          id: string
          notes: string | null
          status: string
          unique_ayahs: number
          verified: boolean
          verified_crossrefs: number
          verified_records: number
        }
        Insert: {
          broken_crossref_refs: number
          broken_record_text_refs: number
          code: string
          created_at?: string
          crossref_count: number
          crossref_sha256: string
          evidence_record_count: number
          evidence_sha256: string
          id?: string
          notes?: string | null
          status: string
          unique_ayahs: number
          verified?: boolean
          verified_crossrefs: number
          verified_records: number
        }
        Update: {
          broken_crossref_refs?: number
          broken_record_text_refs?: number
          code?: string
          created_at?: string
          crossref_count?: number
          crossref_sha256?: string
          evidence_record_count?: number
          evidence_sha256?: string
          id?: string
          notes?: string | null
          status?: string
          unique_ayahs?: number
          verified?: boolean
          verified_crossrefs?: number
          verified_records?: number
        }
        Relationships: []
      }
      quran_lexical_observation_runs: {
        Row: {
          ayah_rows: number
          code: string
          created_at: string
          distinct_surface_tokens: number
          id: string
          method: string
          method_version: string
          result_summary: Json
          source_edition_id: string
          source_sha256: string
          status: string
          token_rows: number
          verified: boolean
        }
        Insert: {
          ayah_rows?: number
          code: string
          created_at?: string
          distinct_surface_tokens?: number
          id?: string
          method: string
          method_version: string
          result_summary?: Json
          source_edition_id: string
          source_sha256: string
          status?: string
          token_rows?: number
          verified?: boolean
        }
        Update: {
          ayah_rows?: number
          code?: string
          created_at?: string
          distinct_surface_tokens?: number
          id?: string
          method?: string
          method_version?: string
          result_summary?: Json
          source_edition_id?: string
          source_sha256?: string
          status?: string
          token_rows?: number
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_lexical_observation_runs_source_edition_id_fkey"
            columns: ["source_edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_lexical_observations: {
        Row: {
          created_at: string
          first_surface_token: string | null
          global_ayah_index: number
          last_surface_token: string | null
          max_token_codepoints: number
          method: string
          method_version: string
          min_token_codepoints: number
          reference: string
          source_edition_id: string
          source_sha256: string
          text_unit_id: string
          token_count: number
          total_codepoints: number
          unique_surface_token_count: number
          verified: boolean
        }
        Insert: {
          created_at?: string
          first_surface_token?: string | null
          global_ayah_index: number
          last_surface_token?: string | null
          max_token_codepoints: number
          method: string
          method_version: string
          min_token_codepoints: number
          reference: string
          source_edition_id: string
          source_sha256: string
          text_unit_id: string
          token_count: number
          total_codepoints: number
          unique_surface_token_count: number
          verified?: boolean
        }
        Update: {
          created_at?: string
          first_surface_token?: string | null
          global_ayah_index?: number
          last_surface_token?: string | null
          max_token_codepoints?: number
          method?: string
          method_version?: string
          min_token_codepoints?: number
          reference?: string
          source_edition_id?: string
          source_sha256?: string
          text_unit_id?: string
          token_count?: number
          total_codepoints?: number
          unique_surface_token_count?: number
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_lexical_observations_source_edition_id_fkey"
            columns: ["source_edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_lexical_observations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: true
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_lexical_observations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: true
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_lexical_tokens: {
        Row: {
          codepoint_length: number
          created_at: string
          global_ayah_index: number
          id: string
          method: string
          method_version: string
          reference: string
          source_edition_id: string
          source_sha256: string
          surface_token: string
          text_unit_id: string
          token_position: number
          token_sha256: string
          verified: boolean
        }
        Insert: {
          codepoint_length: number
          created_at?: string
          global_ayah_index: number
          id?: string
          method: string
          method_version: string
          reference: string
          source_edition_id: string
          source_sha256: string
          surface_token: string
          text_unit_id: string
          token_position: number
          token_sha256: string
          verified?: boolean
        }
        Update: {
          codepoint_length?: number
          created_at?: string
          global_ayah_index?: number
          id?: string
          method?: string
          method_version?: string
          reference?: string
          source_edition_id?: string
          source_sha256?: string
          surface_token?: string
          text_unit_id?: string
          token_position?: number
          token_sha256?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_lexical_tokens_source_edition_id_fkey"
            columns: ["source_edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_lexical_tokens_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_lexical_tokens_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_metadata_snapshots: {
        Row: {
          byte_length: number
          checksum_sha256: string
          created_at: string
          edition_id: string | null
          http_status: number
          id: string
          notes: string | null
          retrieved_at: string
          source_uri: string
          source_version: string
          verified: boolean
        }
        Insert: {
          byte_length: number
          checksum_sha256: string
          created_at?: string
          edition_id?: string | null
          http_status: number
          id?: string
          notes?: string | null
          retrieved_at?: string
          source_uri: string
          source_version: string
          verified?: boolean
        }
        Update: {
          byte_length?: number
          checksum_sha256?: string
          created_at?: string
          edition_id?: string | null
          http_status?: number
          id?: string
          notes?: string | null
          retrieved_at?: string
          source_uri?: string
          source_version?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_metadata_snapshots_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_morphology_runs: {
        Row: {
          code: string
          created_at: string
          distinct_ayahs: number
          distinct_lemmas: number
          distinct_roots: number
          distinct_words: number
          id: string
          method: string
          method_version: string
          result_summary: Json
          segment_rows: number
          source_bytes: number
          source_id: string
          source_sha256: string
          source_url: string
          source_version: string
          status: string
          stem_rows: number
          verified: boolean
        }
        Insert: {
          code: string
          created_at?: string
          distinct_ayahs?: number
          distinct_lemmas?: number
          distinct_roots?: number
          distinct_words?: number
          id?: string
          method: string
          method_version: string
          result_summary?: Json
          segment_rows?: number
          source_bytes: number
          source_id: string
          source_sha256: string
          source_url: string
          source_version: string
          status: string
          stem_rows?: number
          verified?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          distinct_ayahs?: number
          distinct_lemmas?: number
          distinct_roots?: number
          distinct_words?: number
          id?: string
          method?: string
          method_version?: string
          result_summary?: Json
          segment_rows?: number
          source_bytes?: number
          source_id?: string
          source_sha256?: string
          source_url?: string
          source_version?: string
          status?: string
          stem_rows?: number
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_morphology_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_morphology_segments: {
        Row: {
          ayah_number: number
          created_at: string
          features: string
          form_buckwalter: string
          id: string
          lemma_buckwalter: string | null
          location: string
          method: string
          method_version: string
          pos_tag: string
          root_buckwalter: string | null
          segment_index: number
          segment_role: string
          source_id: string
          source_sha256: string
          source_version: string
          surah_number: number
          verified: boolean
          word_index: number
        }
        Insert: {
          ayah_number: number
          created_at?: string
          features: string
          form_buckwalter: string
          id?: string
          lemma_buckwalter?: string | null
          location: string
          method: string
          method_version: string
          pos_tag: string
          root_buckwalter?: string | null
          segment_index: number
          segment_role: string
          source_id: string
          source_sha256: string
          source_version: string
          surah_number: number
          verified?: boolean
          word_index: number
        }
        Update: {
          ayah_number?: number
          created_at?: string
          features?: string
          form_buckwalter?: string
          id?: string
          lemma_buckwalter?: string | null
          location?: string
          method?: string
          method_version?: string
          pos_tag?: string
          root_buckwalter?: string | null
          segment_index?: number
          segment_role?: string
          source_id?: string
          source_sha256?: string
          source_version?: string
          surah_number?: number
          verified?: boolean
          word_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_morphology_segments_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_observation_runs: {
        Row: {
          code: string
          created_at: string
          id: string
          method: string
          method_version: string
          result_summary: Json
          row_count: number
          scope_code: string
          source_snapshot_id: string | null
          status: string
          verified: boolean
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          method: string
          method_version: string
          result_summary?: Json
          row_count?: number
          scope_code?: string
          source_snapshot_id?: string | null
          status?: string
          verified?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          method?: string
          method_version?: string
          result_summary?: Json
          row_count?: number
          scope_code?: string
          source_snapshot_id?: string | null
          status?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_observation_runs_source_snapshot_id_fkey"
            columns: ["source_snapshot_id"]
            isOneToOne: false
            referencedRelation: "quran_metadata_snapshots"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qa_ontology_edges: {
        Row: {
          created_at: string
          id: string
          object_id: string
          predicate_id: string
          raw_relation: string | null
          source_id: string
          source_version: string
          subject_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          object_id: string
          predicate_id: string
          raw_relation?: string | null
          source_id: string
          source_version: string
          subject_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          object_id?: string
          predicate_id?: string
          raw_relation?: string | null
          source_id?: string
          source_version?: string
          subject_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_qa_ontology_edges_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qa_ontology_nodes: {
        Row: {
          created_at: string
          label_ar: string | null
          label_en: string | null
          node_element: string
          node_id: string
          notes: string | null
          source_id: string
          source_version: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          label_ar?: string | null
          label_en?: string | null
          node_element: string
          node_id: string
          notes?: string | null
          source_id: string
          source_version: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          label_ar?: string | null
          label_en?: string | null
          node_element?: string
          node_id?: string
          notes?: string | null
          source_id?: string
          source_version?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_qa_ontology_nodes_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qa_ontology_properties: {
        Row: {
          created_at: string
          label_ar: string | null
          label_en: string | null
          property_id: string
          source_id: string
          source_version: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          label_ar?: string | null
          label_en?: string | null
          property_id: string
          source_id: string
          source_version: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          label_ar?: string | null
          label_en?: string | null
          property_id?: string
          source_id?: string
          source_version?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_qa_ontology_properties_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qa_ontology_runs: {
        Row: {
          code: string
          created_at: string
          distinct_objects: number
          distinct_predicates: number
          distinct_subjects: number
          edge_count: number
          id: string
          node_count: number
          notes: string | null
          property_count: number
          source_bytes: number
          source_id: string
          source_sha256: string
          source_version: string
          status: string
          unresolved_objects: number
          unresolved_subjects: number
          verified: boolean
          verified_edges: number
        }
        Insert: {
          code: string
          created_at?: string
          distinct_objects: number
          distinct_predicates: number
          distinct_subjects: number
          edge_count: number
          id?: string
          node_count: number
          notes?: string | null
          property_count: number
          source_bytes: number
          source_id: string
          source_sha256: string
          source_version: string
          status: string
          unresolved_objects?: number
          unresolved_subjects?: number
          verified?: boolean
          verified_edges?: number
        }
        Update: {
          code?: string
          created_at?: string
          distinct_objects?: number
          distinct_predicates?: number
          distinct_subjects?: number
          edge_count?: number
          id?: string
          node_count?: number
          notes?: string | null
          property_count?: number
          source_bytes?: number
          source_id?: string
          source_sha256?: string
          source_version?: string
          status?: string
          unresolved_objects?: number
          unresolved_subjects?: number
          verified?: boolean
          verified_edges?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_qa_ontology_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qac_feature_inventory: {
        Row: {
          ayah_count: number
          created_at: string
          feature_token: string
          method: string
          method_version: string
          segment_occurrence_count: number
          source_id: string
          source_sha256: string
          source_version: string
          verified: boolean
          word_location_count: number
        }
        Insert: {
          ayah_count: number
          created_at?: string
          feature_token: string
          method: string
          method_version: string
          segment_occurrence_count: number
          source_id: string
          source_sha256: string
          source_version: string
          verified?: boolean
          word_location_count: number
        }
        Update: {
          ayah_count?: number
          created_at?: string
          feature_token?: string
          method?: string
          method_version?: string
          segment_occurrence_count?: number
          source_id?: string
          source_sha256?: string
          source_version?: string
          verified?: boolean
          word_location_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_qac_feature_inventory_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qac_lemma_inventory: {
        Row: {
          ayah_count: number
          created_at: string
          distinct_root_count: number
          first_global_ayah_index: number
          last_global_ayah_index: number
          lemma_buckwalter: string
          method: string
          method_version: string
          sample_root_buckwalter: string | null
          source_id: string
          source_sha256: string
          source_version: string
          verified: boolean
          word_location_count: number
        }
        Insert: {
          ayah_count: number
          created_at?: string
          distinct_root_count: number
          first_global_ayah_index: number
          last_global_ayah_index: number
          lemma_buckwalter: string
          method: string
          method_version: string
          sample_root_buckwalter?: string | null
          source_id: string
          source_sha256: string
          source_version: string
          verified?: boolean
          word_location_count: number
        }
        Update: {
          ayah_count?: number
          created_at?: string
          distinct_root_count?: number
          first_global_ayah_index?: number
          last_global_ayah_index?: number
          lemma_buckwalter?: string
          method?: string
          method_version?: string
          sample_root_buckwalter?: string | null
          source_id?: string
          source_sha256?: string
          source_version?: string
          verified?: boolean
          word_location_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_qac_lemma_inventory_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_qac_pos_inventory: {
        Row: {
          ayah_count: number
          created_at: string
          method: string
          method_version: string
          pos_tag: string
          source_id: string
          source_sha256: string
          source_version: string
          verified: boolean
          word_location_count: number
        }
        Insert: {
          ayah_count: number
          created_at?: string
          method: string
          method_version: string
          pos_tag: string
          source_id: string
          source_sha256: string
          source_version: string
          verified?: boolean
          word_location_count: number
        }
        Update: {
          ayah_count?: number
          created_at?: string
          method?: string
          method_version?: string
          pos_tag?: string
          source_id?: string
          source_sha256?: string
          source_version?: string
          verified?: boolean
          word_location_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_qac_pos_inventory_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_sajda_markers: {
        Row: {
          created_at: string
          reference: string
          sajda_index: number
          sajda_type: string
          source_attributes: Json
          source_checksum_sha256: string
          source_version: string
          text_unit_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          reference: string
          sajda_index: number
          sajda_type: string
          source_attributes?: Json
          source_checksum_sha256: string
          source_version: string
          text_unit_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          reference?: string
          sajda_index?: number
          sajda_type?: string
          source_attributes?: Json
          source_checksum_sha256?: string
          source_version?: string
          text_unit_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_sajda_markers_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_sajda_markers_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_semantic_concept_ayahs: {
        Row: {
          ayah_number: number
          concept_id: string
          created_at: string
          occurrence_count: number
          source_id: string
          source_version: string
          surah_number: number
          text_unit_id: string
          verified: boolean
        }
        Insert: {
          ayah_number: number
          concept_id: string
          created_at?: string
          occurrence_count: number
          source_id: string
          source_version: string
          surah_number: number
          text_unit_id: string
          verified?: boolean
        }
        Update: {
          ayah_number?: number
          concept_id?: string
          created_at?: string
          occurrence_count?: number
          source_id?: string
          source_version?: string
          surah_number?: number
          text_unit_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_semantic_concept_ayahs_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "quran_semantic_concept_ayah_map"
            referencedColumns: ["concept_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_ayahs_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "quran_semantic_concepts"
            referencedColumns: ["concept_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_ayahs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_ayahs_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_ayahs_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_semantic_concept_occurrences: {
        Row: {
          ayah_number: number
          concept_id: string
          created_at: string
          id: string
          location: string
          source_id: string
          source_url: string
          source_version: string
          surah_number: number
          text_unit_id: string
          verified: boolean
          word_index: number
        }
        Insert: {
          ayah_number: number
          concept_id: string
          created_at?: string
          id?: string
          location: string
          source_id: string
          source_url: string
          source_version: string
          surah_number: number
          text_unit_id: string
          verified?: boolean
          word_index: number
        }
        Update: {
          ayah_number?: number
          concept_id?: string
          created_at?: string
          id?: string
          location?: string
          source_id?: string
          source_url?: string
          source_version?: string
          surah_number?: number
          text_unit_id?: string
          verified?: boolean
          word_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_semantic_concept_occurrences_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "quran_semantic_concept_ayah_map"
            referencedColumns: ["concept_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_occurrences_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "quran_semantic_concepts"
            referencedColumns: ["concept_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_occurrences_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_occurrences_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_occurrences_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_semantic_concepts: {
        Row: {
          arabic_name: string | null
          concept_id: string
          created_at: string
          english_name: string
          notes: string | null
          registry_type: string
          source_id: string
          source_url: string
          source_version: string
          verified: boolean
        }
        Insert: {
          arabic_name?: string | null
          concept_id: string
          created_at?: string
          english_name: string
          notes?: string | null
          registry_type?: string
          source_id: string
          source_url: string
          source_version?: string
          verified?: boolean
        }
        Update: {
          arabic_name?: string | null
          concept_id?: string
          created_at?: string
          english_name?: string
          notes?: string | null
          registry_type?: string
          source_id?: string
          source_url?: string
          source_version?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_semantic_concepts_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_semantic_mapping_runs: {
        Row: {
          broken_text_refs: number
          code: string
          concept_ayah_rows: number
          concept_count: number
          concepts_with_occurrences: number
          created_at: string
          id: string
          mapping_sha256: string
          notes: string | null
          source_id: string
          source_url: string
          source_version: string
          status: string
          unique_ayahs: number
          verified: boolean
          verified_concept_ayah_rows: number
          verified_word_occurrences: number
          word_occurrence_rows: number
          zero_occurrence_concepts: number
        }
        Insert: {
          broken_text_refs: number
          code: string
          concept_ayah_rows: number
          concept_count: number
          concepts_with_occurrences: number
          created_at?: string
          id?: string
          mapping_sha256: string
          notes?: string | null
          source_id: string
          source_url: string
          source_version: string
          status: string
          unique_ayahs: number
          verified?: boolean
          verified_concept_ayah_rows: number
          verified_word_occurrences: number
          word_occurrence_rows: number
          zero_occurrence_concepts: number
        }
        Update: {
          broken_text_refs?: number
          code?: string
          concept_ayah_rows?: number
          concept_count?: number
          concepts_with_occurrences?: number
          created_at?: string
          id?: string
          mapping_sha256?: string
          notes?: string | null
          source_id?: string
          source_url?: string
          source_version?: string
          status?: string
          unique_ayahs?: number
          verified?: boolean
          verified_concept_ayah_rows?: number
          verified_word_occurrences?: number
          word_occurrence_rows?: number
          zero_occurrence_concepts?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_semantic_mapping_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_semantic_runs: {
        Row: {
          advertised_concepts: number | null
          advertised_relations: number | null
          code: string
          created_at: string
          id: string
          loaded_topic_concepts: number
          notes: string | null
          retrieved_bytes: number
          source_id: string
          source_sha256: string
          source_url: string
          source_version: string
          status: string
          verified: boolean
        }
        Insert: {
          advertised_concepts?: number | null
          advertised_relations?: number | null
          code: string
          created_at?: string
          id?: string
          loaded_topic_concepts?: number
          notes?: string | null
          retrieved_bytes: number
          source_id: string
          source_sha256: string
          source_url: string
          source_version: string
          status: string
          verified?: boolean
        }
        Update: {
          advertised_concepts?: number | null
          advertised_relations?: number | null
          code?: string
          created_at?: string
          id?: string
          loaded_topic_concepts?: number
          notes?: string | null
          retrieved_bytes?: number
          source_id?: string
          source_sha256?: string
          source_url?: string
          source_version?: string
          status?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_semantic_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_structural_markers: {
        Row: {
          created_at: string
          global_ayah_index: number
          id: string
          marker_index: number
          marker_type: string
          reference: string
          source_attributes: Json
          source_checksum_sha256: string
          source_version: string
          text_unit_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          global_ayah_index: number
          id?: string
          marker_index: number
          marker_type: string
          reference: string
          source_attributes?: Json
          source_checksum_sha256: string
          source_version: string
          text_unit_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          global_ayah_index?: number
          id?: string
          marker_index?: number
          marker_type?: string
          reference?: string
          source_attributes?: Json
          source_checksum_sha256?: string
          source_version?: string
          text_unit_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_structural_markers_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_structural_markers_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_surah_metadata: {
        Row: {
          arabic_name: string
          ayah_count: number
          created_at: string
          english_name: string
          revelation_order: number
          revelation_type: string
          ruku_count: number
          source_checksum_sha256: string
          source_version: string
          start_offset_zero_based: number
          surah_number: number
          text_unit_end_id: string
          text_unit_start_id: string
          transliterated_name: string
          verified: boolean
        }
        Insert: {
          arabic_name: string
          ayah_count: number
          created_at?: string
          english_name: string
          revelation_order: number
          revelation_type: string
          ruku_count: number
          source_checksum_sha256: string
          source_version: string
          start_offset_zero_based: number
          surah_number: number
          text_unit_end_id: string
          text_unit_start_id: string
          transliterated_name: string
          verified?: boolean
        }
        Update: {
          arabic_name?: string
          ayah_count?: number
          created_at?: string
          english_name?: string
          revelation_order?: number
          revelation_type?: string
          ruku_count?: number
          source_checksum_sha256?: string
          source_version?: string
          start_offset_zero_based?: number
          surah_number?: number
          text_unit_end_id?: string
          text_unit_start_id?: string
          transliterated_name?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_surah_metadata_text_unit_end_id_fkey"
            columns: ["text_unit_end_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_surah_metadata_text_unit_end_id_fkey"
            columns: ["text_unit_end_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_surah_metadata_text_unit_start_id_fkey"
            columns: ["text_unit_start_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_surah_metadata_text_unit_start_id_fkey"
            columns: ["text_unit_start_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_surface_lexical_inventory: {
        Row: {
          ayah_count: number
          created_at: string
          first_global_ayah_index: number
          last_global_ayah_index: number
          method: string
          method_version: string
          occurrence_count: number
          source_edition_id: string
          source_sha256: string
          surface_token: string
          verified: boolean
        }
        Insert: {
          ayah_count: number
          created_at?: string
          first_global_ayah_index: number
          last_global_ayah_index: number
          method: string
          method_version: string
          occurrence_count: number
          source_edition_id: string
          source_sha256: string
          surface_token: string
          verified?: boolean
        }
        Update: {
          ayah_count?: number
          created_at?: string
          first_global_ayah_index?: number
          last_global_ayah_index?: number
          method?: string
          method_version?: string
          occurrence_count?: number
          source_edition_id?: string
          source_sha256?: string
          surface_token?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_surface_lexical_inventory_source_edition_id_fkey"
            columns: ["source_edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_syntax_coverage: {
        Row: {
          coverage_basis: string
          covered: boolean
          created_at: string
          notes: string | null
          qac_word_locations: number
          source_id: string
          source_version: string
          surah_number: number
          verified: boolean
        }
        Insert: {
          coverage_basis: string
          covered?: boolean
          created_at?: string
          notes?: string | null
          qac_word_locations?: number
          source_id: string
          source_version: string
          surah_number: number
          verified?: boolean
        }
        Update: {
          coverage_basis?: string
          covered?: boolean
          created_at?: string
          notes?: string | null
          qac_word_locations?: number
          source_id?: string
          source_version?: string
          surah_number?: number
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_syntax_coverage_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_syntax_relation_taxonomy: {
        Row: {
          category: string
          code: string
          direction_rule: string
          name: string
          notes: string | null
          source_url: string
          source_version: string
          verified: boolean
        }
        Insert: {
          category: string
          code: string
          direction_rule: string
          name: string
          notes?: string | null
          source_url: string
          source_version: string
          verified?: boolean
        }
        Update: {
          category?: string
          code?: string
          direction_rule?: string
          name?: string
          notes?: string | null
          source_url?: string
          source_version?: string
          verified?: boolean
        }
        Relationships: []
      }
      quran_syntax_runs: {
        Row: {
          code: string
          coverage_percent: number
          coverage_word_locations: number
          covered_surah_ranges: string
          covered_surahs: number
          created_at: string
          id: string
          notes: string | null
          source_id: string
          source_version: string
          status: string
          total_word_locations: number
          verified: boolean
        }
        Insert: {
          code: string
          coverage_percent?: number
          coverage_word_locations?: number
          covered_surah_ranges: string
          covered_surahs?: number
          created_at?: string
          id?: string
          notes?: string | null
          source_id: string
          source_version: string
          status: string
          total_word_locations?: number
          verified?: boolean
        }
        Update: {
          code?: string
          coverage_percent?: number
          coverage_word_locations?: number
          covered_surah_ranges?: string
          covered_surahs?: number
          created_at?: string
          id?: string
          notes?: string | null
          source_id?: string
          source_version?: string
          status?: string
          total_word_locations?: number
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quran_syntax_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      relations: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          metadata: Json
          object_id: string
          object_type: string
          predicate: string
          source_id: string | null
          subject_id: string
          subject_type: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          metadata?: Json
          object_id: string
          object_type: string
          predicate: string
          source_id?: string | null
          subject_id: string
          subject_type: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          metadata?: Json
          object_id?: string
          object_type?: string
          predicate?: string
          source_id?: string | null
          subject_id?: string
          subject_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "relations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          checksum_sha256: string | null
          citation: string | null
          created_at: string
          id: string
          license: string | null
          name: string
          notes: string | null
          provider_agent_id: string | null
          retrieved_at: string | null
          rights: string | null
          source_type: string
          uri: string | null
          verified: boolean
        }
        Insert: {
          checksum_sha256?: string | null
          citation?: string | null
          created_at?: string
          id?: string
          license?: string | null
          name: string
          notes?: string | null
          provider_agent_id?: string | null
          retrieved_at?: string | null
          rights?: string | null
          source_type: string
          uri?: string | null
          verified?: boolean
        }
        Update: {
          checksum_sha256?: string | null
          citation?: string | null
          created_at?: string
          id?: string
          license?: string | null
          name?: string
          notes?: string | null
          provider_agent_id?: string | null
          retrieved_at?: string | null
          rights?: string | null
          source_type?: string
          uri?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "sources_provider_agent_id_fkey"
            columns: ["provider_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      text_alignments: {
        Row: {
          alignment_type: string
          confidence: number | null
          created_at: string
          id: string
          metadata: Json
          method: string | null
          source_representation_id: string
          target_representation_id: string
        }
        Insert: {
          alignment_type: string
          confidence?: number | null
          created_at?: string
          id?: string
          metadata?: Json
          method?: string | null
          source_representation_id: string
          target_representation_id: string
        }
        Update: {
          alignment_type?: string
          confidence?: number | null
          created_at?: string
          id?: string
          metadata?: Json
          method?: string | null
          source_representation_id?: string
          target_representation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "text_alignments_source_representation_id_fkey"
            columns: ["source_representation_id"]
            isOneToOne: false
            referencedRelation: "text_representations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_alignments_target_representation_id_fkey"
            columns: ["target_representation_id"]
            isOneToOne: false
            referencedRelation: "text_representations"
            referencedColumns: ["id"]
          },
        ]
      }
      text_representation_sources: {
        Row: {
          citation: string | null
          confidence: number | null
          created_at: string
          external_identifier: string | null
          id: string
          is_primary: boolean
          notes: string | null
          relation_type: string
          retrieved_at: string | null
          source_id: string
          text_representation_id: string
          verified: boolean
        }
        Insert: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          external_identifier?: string | null
          id?: string
          is_primary?: boolean
          notes?: string | null
          relation_type: string
          retrieved_at?: string | null
          source_id: string
          text_representation_id: string
          verified?: boolean
        }
        Update: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          external_identifier?: string | null
          id?: string
          is_primary?: boolean
          notes?: string | null
          relation_type?: string
          retrieved_at?: string | null
          source_id?: string
          text_representation_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "text_representation_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_representation_sources_text_representation_id_fkey"
            columns: ["text_representation_id"]
            isOneToOne: false
            referencedRelation: "text_representations"
            referencedColumns: ["id"]
          },
        ]
      }
      text_representations: {
        Row: {
          canonical: boolean
          checksum_sha256: string | null
          content_role: string
          created_at: string
          edition_id: string | null
          id: string
          language_tag: string
          metadata: Json
          normalized_text: string | null
          script_code: string | null
          text: string
          text_unit_id: string
          translation_id: string | null
          verified: boolean
        }
        Insert: {
          canonical?: boolean
          checksum_sha256?: string | null
          content_role: string
          created_at?: string
          edition_id?: string | null
          id?: string
          language_tag: string
          metadata?: Json
          normalized_text?: string | null
          script_code?: string | null
          text: string
          text_unit_id: string
          translation_id?: string | null
          verified?: boolean
        }
        Update: {
          canonical?: boolean
          checksum_sha256?: string | null
          content_role?: string
          created_at?: string
          edition_id?: string | null
          id?: string
          language_tag?: string
          metadata?: Json
          normalized_text?: string | null
          script_code?: string | null
          text?: string
          text_unit_id?: string
          translation_id?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "text_representations_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_representations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "text_representations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_representations_translation_id_fkey"
            columns: ["translation_id"]
            isOneToOne: false
            referencedRelation: "translations"
            referencedColumns: ["id"]
          },
        ]
      }
      text_units: {
        Row: {
          canonical_identifier: string | null
          created_at: string
          document_id: string
          end_locator: Json | null
          id: string
          metadata: Json
          ordinal_in_parent: number | null
          parent_unit_id: string | null
          reference: string
          sequence_no: number | null
          start_locator: Json | null
          unit_type: string
        }
        Insert: {
          canonical_identifier?: string | null
          created_at?: string
          document_id: string
          end_locator?: Json | null
          id?: string
          metadata?: Json
          ordinal_in_parent?: number | null
          parent_unit_id?: string | null
          reference: string
          sequence_no?: number | null
          start_locator?: Json | null
          unit_type: string
        }
        Update: {
          canonical_identifier?: string | null
          created_at?: string
          document_id?: string
          end_locator?: Json | null
          id?: string
          metadata?: Json
          ordinal_in_parent?: number | null
          parent_unit_id?: string | null
          reference?: string
          sequence_no?: number | null
          start_locator?: Json | null
          unit_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "text_units_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_units_parent_unit_id_fkey"
            columns: ["parent_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "text_units_parent_unit_id_fkey"
            columns: ["parent_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      tradition_activities: {
        Row: {
          created_at: string
          evidence_status: string
          id: string
          local_description: string | null
          native_name: string | null
          scope: string | null
          tradition_id: string
          universal_activity_id: string
        }
        Insert: {
          created_at?: string
          evidence_status?: string
          id?: string
          local_description?: string | null
          native_name?: string | null
          scope?: string | null
          tradition_id: string
          universal_activity_id: string
        }
        Update: {
          created_at?: string
          evidence_status?: string
          id?: string
          local_description?: string | null
          native_name?: string | null
          scope?: string | null
          tradition_id?: string
          universal_activity_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tradition_activities_tradition_id_fkey"
            columns: ["tradition_id"]
            isOneToOne: false
            referencedRelation: "traditions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tradition_activities_universal_activity_id_fkey"
            columns: ["universal_activity_id"]
            isOneToOne: false
            referencedRelation: "universal_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      tradition_branches: {
        Row: {
          active: boolean
          branch_type: string | null
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          parent_branch_id: string | null
          tradition_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          branch_type?: string | null
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_branch_id?: string | null
          tradition_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          branch_type?: string | null
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_branch_id?: string | null
          tradition_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tradition_branches_parent_branch_id_fkey"
            columns: ["parent_branch_id"]
            isOneToOne: false
            referencedRelation: "tradition_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tradition_branches_tradition_id_fkey"
            columns: ["tradition_id"]
            isOneToOne: false
            referencedRelation: "traditions"
            referencedColumns: ["id"]
          },
        ]
      }
      tradition_families: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          worldview_id: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          worldview_id: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          worldview_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tradition_families_worldview_id_fkey"
            columns: ["worldview_id"]
            isOneToOne: false
            referencedRelation: "worldviews"
            referencedColumns: ["id"]
          },
        ]
      }
      traditions: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          tradition_family_id: string | null
          tradition_type: string | null
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          tradition_family_id?: string | null
          tradition_type?: string | null
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          tradition_family_id?: string | null
          tradition_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "traditions_tradition_family_id_fkey"
            columns: ["tradition_family_id"]
            isOneToOne: false
            referencedRelation: "tradition_families"
            referencedColumns: ["id"]
          },
        ]
      }
      translation_sources: {
        Row: {
          citation: string | null
          confidence: number | null
          created_at: string
          external_identifier: string | null
          id: string
          is_primary: boolean
          notes: string | null
          relation_type: string
          retrieved_at: string | null
          source_id: string
          translation_id: string
          verified: boolean
        }
        Insert: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          external_identifier?: string | null
          id?: string
          is_primary?: boolean
          notes?: string | null
          relation_type: string
          retrieved_at?: string | null
          source_id: string
          translation_id: string
          verified?: boolean
        }
        Update: {
          citation?: string | null
          confidence?: number | null
          created_at?: string
          external_identifier?: string | null
          id?: string
          is_primary?: boolean
          notes?: string | null
          relation_type?: string
          retrieved_at?: string | null
          source_id?: string
          translation_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "translation_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translation_sources_translation_id_fkey"
            columns: ["translation_id"]
            isOneToOne: false
            referencedRelation: "translations"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          active: boolean
          agent_id: string | null
          code: string
          corpus_id: string
          created_at: string
          date_published: string | null
          edition_id: string | null
          id: string
          language_tag: string
          license: string | null
          notes: string | null
          publisher_name: string | null
          rights: string | null
          title: string
          translator_name: string | null
          verified: boolean
          version: string | null
        }
        Insert: {
          active?: boolean
          agent_id?: string | null
          code: string
          corpus_id: string
          created_at?: string
          date_published?: string | null
          edition_id?: string | null
          id?: string
          language_tag: string
          license?: string | null
          notes?: string | null
          publisher_name?: string | null
          rights?: string | null
          title: string
          translator_name?: string | null
          verified?: boolean
          version?: string | null
        }
        Update: {
          active?: boolean
          agent_id?: string | null
          code?: string
          corpus_id?: string
          created_at?: string
          date_published?: string | null
          edition_id?: string | null
          id?: string
          language_tag?: string
          license?: string | null
          notes?: string | null
          publisher_name?: string | null
          rights?: string | null
          title?: string
          translator_name?: string | null
          verified?: boolean
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_corpus_id_fkey"
            columns: ["corpus_id"]
            isOneToOne: false
            referencedRelation: "corpora"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      universal_activities: {
        Row: {
          active: boolean
          category: string
          code: string
          created_at: string
          description: string
          id: string
          name: string
          polarity_type: string | null
        }
        Insert: {
          active?: boolean
          category: string
          code: string
          created_at?: string
          description: string
          id?: string
          name: string
          polarity_type?: string | null
        }
        Update: {
          active?: boolean
          category?: string
          code?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          polarity_type?: string | null
        }
        Relationships: []
      }
      worldviews: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          worldview_type: string | null
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          worldview_type?: string | null
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          worldview_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      quran_annotations: {
        Row: {
          agent_id: string | null
          annotation_text: string | null
          annotation_type: string | null
          ayah_number: number | null
          confidence: number | null
          created_at: string | null
          epistemic_type: string | null
          global_ayah_index: number | null
          hizb: number | null
          hizb_quarter: number | null
          id: string | null
          juz: number | null
          label: string | null
          manzil: number | null
          metadata: Json | null
          method: string | null
          mushaf_page: number | null
          reference: string | null
          revelation_order: number | null
          revelation_type: string | null
          ruku: number | null
          scope_code: string | null
          source_id: string | null
          status: string | null
          surah_name_arabic: string | null
          surah_name_english: string | null
          surah_name_transliterated: string | null
          surah_number: number | null
          text_unit_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "annotations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "annotations_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
      quran_ayah_structure: {
        Row: {
          ayah_number: number | null
          global_ayah_index: number | null
          hizb: number | null
          hizb_quarter: number | null
          juz: number | null
          manzil: number | null
          mushaf_page: number | null
          reference: string | null
          revelation_order: number | null
          revelation_type: string | null
          ruku: number | null
          surah_ayah_count: number | null
          surah_name_arabic: string | null
          surah_name_english: string | null
          surah_name_transliterated: string | null
          surah_number: number | null
          text_unit_id: string | null
        }
        Relationships: []
      }
      quran_evidence_spine: {
        Row: {
          ayah_number: number | null
          canonical_count: number | null
          global_ayah_index: number | null
          hizb: number | null
          hizb_quarter: number | null
          juz: number | null
          lexical_count: number | null
          manzil: number | null
          morphology_count: number | null
          mushaf_page: number | null
          observation_count: number | null
          reference: string | null
          ruku: number | null
          semantic_occurrence_count: number | null
          structural_count: number | null
          surah_number: number | null
        }
        Relationships: []
      }
      quran_morphology_audit: {
        Row: {
          actual_ayah_coverage: number | null
          code: string | null
          distinct_ayahs: number | null
          distinct_lemmas: number | null
          distinct_roots: number | null
          distinct_words: number | null
          malformed_locations: number | null
          segment_rows: number | null
          source_bytes: number | null
          source_sha256: string | null
          source_version: string | null
          status: string | null
          stem_rows: number | null
          unverified_segments: number | null
          verified: boolean | null
        }
        Insert: {
          actual_ayah_coverage?: never
          code?: string | null
          distinct_ayahs?: number | null
          distinct_lemmas?: number | null
          distinct_roots?: number | null
          distinct_words?: number | null
          malformed_locations?: never
          segment_rows?: number | null
          source_bytes?: number | null
          source_sha256?: string | null
          source_version?: string | null
          status?: string | null
          stem_rows?: number | null
          unverified_segments?: never
          verified?: boolean | null
        }
        Update: {
          actual_ayah_coverage?: never
          code?: string | null
          distinct_ayahs?: number | null
          distinct_lemmas?: number | null
          distinct_roots?: number | null
          distinct_words?: number | null
          malformed_locations?: never
          segment_rows?: number | null
          source_bytes?: number | null
          source_sha256?: string | null
          source_version?: string | null
          status?: string | null
          stem_rows?: number | null
          unverified_segments?: never
          verified?: boolean | null
        }
        Relationships: []
      }
      quran_morphology_ayah_summary: {
        Row: {
          ayah_number: number | null
          global_ayah_index: number | null
          qac_segments: number | null
          qac_word_locations: number | null
          reference: string | null
          surah_number: number | null
          unique_lemmas_in_ayah: number | null
          unique_roots_in_ayah: number | null
        }
        Relationships: []
      }
      quran_morphology_words: {
        Row: {
          ayah_number: number | null
          lemma_buckwalter: string | null
          root_buckwalter: string | null
          segment_count: number | null
          segmented_form_buckwalter: string | null
          segments: Json | null
          source_version: string | null
          stem_form_buckwalter: string | null
          stem_pos_tag: string | null
          surah_number: number | null
          word_index: number | null
          word_reference: string | null
        }
        Relationships: []
      }
      quran_qa_ontology_graph: {
        Row: {
          object_id: string | null
          object_label_ar: string | null
          object_label_en: string | null
          predicate_id: string | null
          predicate_label_ar: string | null
          predicate_label_en: string | null
          source_version: string | null
          subject_id: string | null
          subject_label_ar: string | null
          subject_label_en: string | null
          verified: boolean | null
        }
        Relationships: []
      }
      quran_semantic_concept_ayah_map: {
        Row: {
          arabic_name: string | null
          ayah_number: number | null
          concept_id: string | null
          english_name: string | null
          occurrence_count: number | null
          source_id: string | null
          source_version: string | null
          surah_number: number | null
          text_unit_id: string | null
          verified: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "quran_semantic_concept_ayahs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_ayahs_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "quran_ayah_structure"
            referencedColumns: ["text_unit_id"]
          },
          {
            foreignKeyName: "quran_semantic_concept_ayahs_text_unit_id_fkey"
            columns: ["text_unit_id"]
            isOneToOne: false
            referencedRelation: "text_units"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      q4q_ingest_semantic_concept_occurrences: {
        Args: { p_concept_id: string }
        Returns: {
          advertised_occurrences: number
          loaded_ayahs: number
          loaded_occurrences: number
        }[]
      }
      q4q_is_locked: { Args: { scope_code_in: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
