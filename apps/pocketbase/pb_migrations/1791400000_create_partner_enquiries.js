/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    let existing;
    try {
      existing = app.findCollectionByNameOrId('partner_enquiries');
    } catch (_) {
      /* new collection */
    }
    if (existing) return;

    const collection = new Collection({
      type: 'base',
      name: 'partner_enquiries',
      // Anonymous submission form — nobody can list/view/update/delete via REST.
      listRule: null,
      viewRule: null,
      createRule: '@request.body.consent = true',
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true, min: 2, max: 160 },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', max: 40 },
        { name: 'organization', type: 'text', max: 200 },
        { name: 'partnerType', type: 'select', required: true, maxSelect: 1, values: ['imprensa', 'parceiro', 'espaco'] },
        { name: 'brand', type: 'text', max: 200 },
        { name: 'city', type: 'text', max: 120 },
        { name: 'website', type: 'url', max: 500 },
        { name: 'message', type: 'text', required: true, min: 10, max: 4000 },
        { name: 'consent', type: 'bool', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    });
    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('partner_enquiries');
    app.delete(collection);
  },
);
