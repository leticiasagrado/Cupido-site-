/// <reference path="../pb_data/types.d.ts" />

// PROMPT 06 — Founding Members campaign infrastructure.
// - campaign_settings: a single admin-managed record controlling the launch
//   campaign (status, discount %, optional start/end dates, optional max
//   adesões, notes). Default status 'rascunho' — the campaign is NOT active
//   until the administradora expressly sets it to 'ativa'.
// - campaign_adhesions: admin-only log of eligible client adesões (client,
//   plan, regular/promotional price, discount, date, notes).
// Both collections are admin-only. The homepage reads campaign_settings
// server-side via the superuser client; no public read access is granted.
// Preserves all existing collections, records, photos and consents.
migrate(
  (app) => {
    // --- 1. campaign_settings collection ---
    let settings;
    let settingsIsNew = false;
    try {
      settings = app.findCollectionByNameOrId('campaign_settings');
    } catch (_) {
      settings = new Collection({
        type: 'base',
        name: 'campaign_settings',
        listRule: '@request.auth.role = "admin"',
        viewRule: '@request.auth.role = "admin"',
        createRule: '@request.auth.role = "admin"',
        updateRule: '@request.auth.role = "admin"',
        deleteRule: '@request.auth.role = "admin"',
        fields: [
          {
            name: 'status',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: ['rascunho', 'ativa', 'encerrada'],
          },
          { name: 'discountPercentage', type: 'number', min: 0, max: 100 },
          { name: 'startDate', type: 'date' },
          { name: 'endDate', type: 'date' },
          { name: 'maxAdhesions', type: 'number', min: 0 },
          { name: 'notes', type: 'text', max: 2000 },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      });
      app.save(settings);
      settingsIsNew = true;
    }

    // Seed a single default record only when the collection is freshly created.
    if (settingsIsNew) {
      const record = new Record(settings);
      record.set('status', 'rascunho');
      record.set('discountPercentage', 15);
      app.save(record);
    }

    // --- 2. campaign_adhesions collection ---
    try {
      app.findCollectionByNameOrId('campaign_adhesions');
    } catch (_) {
      const adhesions = new Collection({
        type: 'base',
        name: 'campaign_adhesions',
        listRule: '@request.auth.role = "admin"',
        viewRule: '@request.auth.role = "admin"',
        createRule: '@request.auth.role = "admin"',
        updateRule: '@request.auth.role = "admin"',
        deleteRule: '@request.auth.role = "admin"',
        fields: [
          { name: 'clientName', type: 'text', required: true, min: 2, max: 160 },
          { name: 'clientEmail', type: 'email', required: true },
          {
            name: 'plan',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: [
              'private-matchmaking',
              'signature',
              'elite-concierge',
              'bespoke-private-search',
            ],
          },
          { name: 'regularPrice', type: 'number', required: true, min: 0 },
          { name: 'promotionalPrice', type: 'number', required: true, min: 0 },
          { name: 'discountPercentage', type: 'number', required: true, min: 0, max: 100 },
          { name: 'adhesionDate', type: 'date', required: true },
          { name: 'notes', type: 'text', max: 2000 },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      });
      app.save(adhesions);
    }
  },
  (app) => {
    // Revert: drop both collections.
    try {
      const adhesions = app.findCollectionByNameOrId('campaign_adhesions');
      app.delete(adhesions);
    } catch (_) {
      /* already gone */
    }
    try {
      const settings = app.findCollectionByNameOrId('campaign_settings');
      app.delete(settings);
    } catch (_) {
      /* already gone */
    }
  },
);
