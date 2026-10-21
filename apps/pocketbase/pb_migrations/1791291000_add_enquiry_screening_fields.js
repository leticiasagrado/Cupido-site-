/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('bureau_enquiries');

    // Percurso da candidatura: contratar o serviço ou integrar a rede privada.
    if (!collection.fields.getByName('path')) {
      collection.fields.add(
        new SelectField({
          name: 'path',
          maxSelect: 1,
          values: ['contratar', 'rede-privada'],
        }),
      );
    }

    // Faixa etária (triagem simples, sem data de nascimento).
    if (!collection.fields.getByName('ageRange')) {
      collection.fields.add(
        new SelectField({
          name: 'ageRange',
          maxSelect: 1,
          values: ['18-29', '30-39', '40-49', '50-59', '60-mais'],
        }),
      );
    }

    // Situação actual.
    if (!collection.fields.getByName('situation')) {
      collection.fields.add(
        new SelectField({
          name: 'situation',
          maxSelect: 1,
          values: ['solteiro', 'divorciado', 'viuvo'],
        }),
      );
    }

    // Âmbito geográfico pretendido.
    if (!collection.fields.getByName('scope')) {
      collection.fields.add(
        new SelectField({
          name: 'scope',
          maxSelect: 1,
          values: ['cidade', 'portugal', 'internacional'],
        }),
      );
    }

    // Principal motivo (texto livre, curto).
    if (!collection.fields.getByName('motivation')) {
      collection.fields.add(
        new TextField({
          name: 'motivation',
          max: 500,
        }),
      );
    }

    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('bureau_enquiries');
    ['path', 'ageRange', 'situation', 'scope', 'motivation'].forEach((name) => {
      if (collection.fields.getByName(name)) {
        collection.fields.removeByName(name);
      }
    });
    app.save(collection);
  },
);
