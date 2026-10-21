/// <reference path="../pb_data/types.d.ts" />

// PROMPT 05 — The Cupid Method internal tooling.
// Creates a `compatibility_notes` collection for the matchmaking team's
// professional notes, contact log, feedback and potential-compatibility
// suggestions, linked to existing `network_applications` records.
//
// Admin + staff (matchmaking team) may read and create notes; admin may
// update and delete. Marketing role has no access. This collection stores
// only professional, factual, service-related notes — never diagnoses,
// mental-health classifications or derogatory comments (enforced by policy
// in the admin UI, not by the schema).
//
// The aprofundado compatibility questionnaire is NOT activated here: it
// remains a draft until the Privacy Policy is updated and approved, so no
// questionnaire-response collection is created. Preserves all existing
// collections, records, photos and consents.
migrate(
  (app) => {
    const network = app.findCollectionByNameOrId('network_applications');

    let notes;
    try {
      notes = app.findCollectionByNameOrId('compatibility_notes');
    } catch (_) {
      notes = new Collection({
        type: 'base',
        name: 'compatibility_notes',
        // Matchmaking team (staff) and admins may read; marketing cannot.
        listRule: '@request.auth.role = "admin" || @request.auth.role = "staff"',
        viewRule: '@request.auth.role = "admin" || @request.auth.role = "staff"',
        createRule: '@request.auth.role = "admin" || @request.auth.role = "staff"',
        updateRule: '@request.auth.role = "admin" || @request.auth.role = "staff"',
        deleteRule: '@request.auth.role = "admin"',
        fields: [
          {
            name: 'candidate',
            type: 'relation',
            required: true,
            maxSelect: 1,
            collectionId: network.id,
            cascadeDelete: true,
          },
          {
            name: 'relatedCandidate',
            type: 'relation',
            maxSelect: 1,
            collectionId: network.id,
            cascadeDelete: true,
          },
          {
            name: 'noteType',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: ['observacao', 'contacto', 'feedback', 'compatibilidade'],
          },
          { name: 'note', type: 'text', required: true, min: 2, max: 2000 },
          {
            name: 'compatibilityTone',
            type: 'select',
            maxSelect: 1,
            values: ['potencial', 'a-avaliar', 'descartada'],
          },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
        indexes: [
          'CREATE INDEX idx_compat_notes_candidate ON compatibility_notes (candidate)',
          'CREATE INDEX idx_compat_notes_type ON compatibility_notes (noteType)',
        ],
      });
      app.save(notes);
    }
  },
  (app) => {
    try {
      const notes = app.findCollectionByNameOrId('compatibility_notes');
      app.delete(notes);
    } catch (_) {
      /* already gone */
    }
  },
);
