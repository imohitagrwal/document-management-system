/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

const User = require('../api/users/users.model');

const config = require('./environment/');

module.exports = function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    User.find({}).remove()
      .then(() => {
        User.create(
          {
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test',
            accountId: 'Egni_u001',
          }, {
            provider: 'local',
            name: 'Test User',
            email: 'test2@example.com',
            password: 'test2',
            accountId: 'Egni_u002',
          },
          {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin',
            accountId: 'Egni_u001',

          },
        )
          .then(() => console.info('finished populating users'))
          .catch(err => console.error('error populating users', err));
      });
  }
}
