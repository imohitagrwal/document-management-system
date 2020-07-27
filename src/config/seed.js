/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

const User = require('../api/users/users.model');
const Accounts = require("../db/masterdb.model");

const config = require('./environment/');

module.exports = async function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    await Accounts.remove({});
    await Accounts.create([
      {
        "accountId" : "DMS_u001",
        "accountName" : "Automate.io",
        "uri" : {
          "dms" : "mongodb://localhost:27017/automate-io"
        },
        "active" : true
      },
      {
        "accountId" : "DMS_u002",
        "accountName" : "test",
        "uri" : {
          "dms" : "mongodb://localhost:27017/test"
        },
        "active" : true
      }
      
    ])
    await User.remove();
    await User.create([
      {
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test',
        accountId: 'DMS_u001',
        active: true,
      }, {
        provider: 'local',
        name: 'Test User',
        email: 'test2@example.com',
        password: 'test2',
        accountId: 'DMS_u002',
        active: true,
      },
      {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin',
        accountId: 'DMS_u001',
        active: true,
      }]
    )
    
    console.log("Dummy Data Seed Done");
    
  }
}
