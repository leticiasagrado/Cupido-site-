/// <reference path="../pb_data/types.d.ts" />

// Free Private Network applications with private photo uploads.
// Also adds a locked `role` field to `users` so an app admin can review
// submissions and view protected photos. Preserves all existing collections
// and records (bureau_enquiries, partner_enquiries, users).
migrate(
  (app) => {
    // --- 1. Add a locked `role` field to the existing users collection ---
    const users = app.findCollectionByNameOrId('users');

    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          maxSelect: 1,
          values: ['member', 'admin'],
        }),
      );
    }

    // Lock the privileged `role` field: a member may not change their own
    // role; only an admin may. Open sign-up is preserved but cannot escalate.
    users.listRule = 'id = @request.auth.id';
    users.viewRule = 'id = @request.auth.id';
    users.createRule =
      '(@request.body.role:isset = false || @request.body.role = "member")';
    users.updateRule =
      '(id = @request.auth.id && @request.body.role:changed = false) || @request.auth.role = "admin"';
    users.deleteRule = 'id = @request.auth.id';
    app.save(users);

    // --- 2. Create the network_applications collection ---
    let network;
    try {
      network = app.findCollectionByNameOrId('network_applications');
    } catch (_) {
      network = new Collection({
        type: 'base',
        name: 'network_applications',
        // Only admins can read submissions and protected photos.
        listRule: '@request.auth.role = "admin"',
        viewRule: '@request.auth.role = "admin"',
        // Anonymous create is allowed only with both consents present.
        createRule:
          '@request.body.consentPrivacy = true && @request.body.consentAdult = true',
        updateRule: '@request.auth.role = "admin"',
        deleteRule: '@request.auth.role = "admin"',
        fields: [
          { name: 'firstName', type: 'text', required: true, min: 2, max: 80 },
          { name: 'lastName', type: 'text', required: true, min: 2, max: 80 },
          { name: 'email', type: 'email', required: true },
          { name: 'birthDate', type: 'date', required: true },
          { name: 'cityCountry', type: 'text', required: true, min: 2, max: 160 },
          { name: 'phone', type: 'text', max: 40 },
          {
            name: 'intention',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: ['relacao-seria', 'conhecer-intencao', 'a-definir'],
          },
          { name: 'aboutYou', type: 'text', max: 500 },
          {
            name: 'photos',
            type: 'file',
            maxSelect: 3,
            maxSize: 5242880,
            mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
            protected: true,
          },
          { name: 'consentAdult', type: 'bool', required: true },
          { name: 'consentPrivacy', type: 'bool', required: true },
          { name: 'consentSharePhotos', type: 'bool' },
          {
            name: 'status',
            type: 'select',
            maxSelect: 1,
            values: ['pending', 'approved', 'rejected', 'info-requested'],
          },
          { name: 'adminNotes', type: 'text', max: 2000 },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      });
      app.save(network);
    }

    // --- 3. Seed the first app admin (the administradora) ---
    // The initial password comes from the environment, never from code.
    // If ADMIN_INITIAL_PASSWORD is not set, no admin is seeded here; create
    // one from the PocketBase dashboard instead.
    const adminEmail = 'admin@cupidbureau.site';
    const adminPassword = $os.getenv('ADMIN_INITIAL_PASSWORD');
    const existing = app.findRecordsByFilter(
      'users',
      `email = "${adminEmail}"`,
    );
    if (existing.length === 0 && adminPassword) {
      const admin = new Record(users, {
        email: adminEmail,
        name: 'Administradora',
        role: 'admin',
        verified: true,
      });
      admin.set('password', adminPassword);
      admin.set('passwordConfirm', adminPassword);
      app.save(admin);
    }
  },
  (app) => {
    // Revert: drop the collection and the role field. Leave seeded admin record.
    try {
      const network = app.findCollectionByNameOrId('network_applications');
      app.delete(network);
    } catch (_) {
      /* already gone */
    }
    try {
      const users = app.findCollectionByNameOrId('users');
      if (users.fields.getByName('role')) {
        users.fields.removeByName('role');
        users.listRule = 'id = @request.auth.id';
        users.viewRule = 'id = @request.auth.id';
        users.createRule = '';
        users.updateRule = 'id = @request.auth.id';
        users.deleteRule = 'id = @request.auth.id';
        app.save(users);
      }
    } catch (_) {
      /* users unchanged */
    }
  },
);
