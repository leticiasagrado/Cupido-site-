migrate((app) => {
  let existing;
  try { existing = app.findCollectionByNameOrId('bureau_enquiries'); } catch (_) { /* New collection. */ }
  if (existing) return;
  const collection = new Collection({
    type: 'base', name: 'bureau_enquiries',
    listRule: null, viewRule: null,
    createRule: '@request.body.consent = true && @request.body.adult = true',
    updateRule: null, deleteRule: null,
    fields: [
      { name: 'name', type: 'text', required: true, min: 2, max: 160 },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', max: 40 },
      { name: 'city', type: 'text', required: true, max: 120 },
      { name: 'kind', type: 'select', required: true, maxSelect: 1, values: ['candidatura', 'consulta', 'contacto', 'eventos'] },
      { name: 'service', type: 'select', required: true, maxSelect: 1, values: ['por-definir', 'private-matchmaking', 'signature', 'elite-concierge', 'bespoke-private-search'] },
      { name: 'availability', type: 'text', max: 240 },
      { name: 'message', type: 'text', required: true, min: 10, max: 4000 },
      { name: 'consent', type: 'bool', required: true },
      { name: 'adult', type: 'bool', required: true },
      { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
      { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId('bureau_enquiries');
  app.delete(collection);
});
