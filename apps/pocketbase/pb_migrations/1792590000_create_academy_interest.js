/// <reference path="../pb_data/types.d.ts" />

// The Cupid Academy — phase 1 waiting list. Anyone may join with consent;
// only admins can read, edit or delete. Preserves all existing collections.
migrate(
  (app) => {
    try {
      app.findCollectionByNameOrId('academy_interest');
      return;
    } catch (_) {
      /* new collection */
    }
    const collection = new Collection({
      type: 'base',
      name: 'academy_interest',
      listRule: '@request.auth.role = "admin"',
      viewRule: '@request.auth.role = "admin"',
      createRule: '@request.body.consent = true',
      updateRule: '@request.auth.role = "admin"',
      deleteRule: '@request.auth.role = "admin"',
      fields: [
        { name: 'name', type: 'text', required: true, min: 2, max: 160 },
        { name: 'email', type: 'email', required: true },
        {
          name: 'course',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: [
            'confianca-para-amar',
            'arte-de-criar-conexoes',
            'first-date-confidence',
            'recomecar-no-amor',
            'amar-depois-dos-40',
            'dating-with-intention',
            'ebook-50-perguntas',
            'guia-primeiro-encontro',
            'workshop-comunicacao',
            'mini-curso-autoestima',
            'workshop-grupo',
            'sessao-individual',
            'todos',
          ],
        },
        { name: 'message', type: 'text', max: 1000 },
        { name: 'lang', type: 'select', maxSelect: 1, values: ['pt', 'en'] },
        { name: 'consent', type: 'bool', required: true },
        { name: 'consentMarketing', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_academy_interest_course ON academy_interest (course)'],
    });
    app.save(collection);
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('academy_interest'));
    } catch (_) {
      /* already gone */
    }
  },
);
