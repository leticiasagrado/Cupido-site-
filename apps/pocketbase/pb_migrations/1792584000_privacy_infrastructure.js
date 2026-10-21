/// <reference path="../pb_data/types.d.ts" />

// PROMPT 04 — Data protection infrastructure.
// - Expands the locked `role` field on `users` with `staff` (matchmaking team)
//   and `marketing` roles, so access can be role-scoped going forward.
// - Adds an optional `consentMarketing` flag to `network_applications` and
//   `bureau_enquiries` (separate authorisation D — promotional communications),
//   never required to submit.
// - Lets the matchmaking team (`staff`) view network applications (read-only);
//   update/delete remain admin-only. Marketing never sees applications.
// - Creates a `privacy_requests` collection for data-subject rights workflow
//   (access, rectification, erasure, restriction, portability, objection,
//   consent withdrawal). Public create; admin-only read/update/delete.
// Preserves all existing collections, records, photos and consents.
migrate(
  (app) => {
    // --- 1. Expand the locked `role` field on users ---
    const users = app.findCollectionByNameOrId('users');
    const roleField = users.fields.getByName('role');
    if (roleField) {
      const vals = (roleField.values || []).slice();
      ['staff', 'marketing'].forEach((v) => {
        if (!vals.includes(v)) vals.push(v);
      });
      roleField.values = vals;
    }
    // Keep the privileged-field lock intact (already set by the prior
    // migration): members cannot change their own role; only admins can.
    app.save(users);

    // --- 2. network_applications: add consentMarketing + staff read access ---
    const network = app.findCollectionByNameOrId('network_applications');
    if (!network.fields.getByName('consentMarketing')) {
      network.fields.add(new BoolField({ name: 'consentMarketing' }));
    }
    // Matchmaking team may consult applications; only admin may change/delete.
    network.listRule = '@request.auth.role = "admin" || @request.auth.role = "staff"';
    network.viewRule = '@request.auth.role = "admin" || @request.auth.role = "staff"';
    network.updateRule = '@request.auth.role = "admin"';
    network.deleteRule = '@request.auth.role = "admin"';
    app.save(network);

    // --- 3. bureau_enquiries: add consentMarketing ---
    const enquiries = app.findCollectionByNameOrId('bureau_enquiries');
    if (!enquiries.fields.getByName('consentMarketing')) {
      enquiries.fields.add(new BoolField({ name: 'consentMarketing' }));
    }
    app.save(enquiries);

    // --- 4. privacy_requests collection (data-subject rights) ---
    let privacy;
    try {
      privacy = app.findCollectionByNameOrId('privacy_requests');
    } catch (_) {
      privacy = new Collection({
        type: 'base',
        name: 'privacy_requests',
        // Admin-only read/update/delete; anyone may submit a request.
        listRule: '@request.auth.role = "admin"',
        viewRule: '@request.auth.role = "admin"',
        createRule: '',
        updateRule: '@request.auth.role = "admin"',
        deleteRule: '@request.auth.role = "admin"',
        fields: [
          { name: 'name', type: 'text', required: true, min: 2, max: 160 },
          { name: 'email', type: 'email', required: true },
          {
            name: 'requestType',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: [
              'acesso',
              'rectificacao',
              'apagamento',
              'limitacao',
              'portabilidade',
              'oposicao',
              'retirada-consentimento',
            ],
          },
          { name: 'details', type: 'text', max: 2000 },
          {
            name: 'status',
            type: 'select',
            maxSelect: 1,
            values: ['novo', 'em-tratamento', 'concluido', 'recusado'],
          },
          { name: 'adminNotes', type: 'text', max: 2000 },
          { name: 'identityVerified', type: 'bool' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      });
      app.save(privacy);
    }
  },
  (app) => {
    // Revert: drop privacy_requests, remove consentMarketing, restore rules.
    try {
      const privacy = app.findCollectionByNameOrId('privacy_requests');
      app.delete(privacy);
    } catch (_) {
      /* already gone */
    }
    try {
      const network = app.findCollectionByNameOrId('network_applications');
      if (network.fields.getByName('consentMarketing')) {
        network.fields.removeByName('consentMarketing');
      }
      network.listRule = '@request.auth.role = "admin"';
      network.viewRule = '@request.auth.role = "admin"';
      network.updateRule = '@request.auth.role = "admin"';
      network.deleteRule = '@request.auth.role = "admin"';
      app.save(network);
    } catch (_) {
      /* network unchanged */
    }
    try {
      const enquiries = app.findCollectionByNameOrId('bureau_enquiries');
      if (enquiries.fields.getByName('consentMarketing')) {
        enquiries.fields.removeByName('consentMarketing');
      }
      app.save(enquiries);
    } catch (_) {
      /* enquiries unchanged */
    }
    // Leave the expanded role values in place on revert to avoid dropping
    // any staff/marketing records that may already exist.
  },
);
