const _ = require('lodash');

const all = {
  env: process.env.NODE_ENV || 'development',

  // Server port
  port: process.env.PORT || 3000,

  // Should we populate the DB with sample data?
  seedDB: true,

  // DB Connection Cleanup Interval In minute
  timeInterval: process.env.DB_TTL || 10,
  modelTimeInterval: process.env.MODEL_TTL || 10,

  secrets: {
    session: 'dms-secret',
  },

  // MongoDB connection options
  mongo: {
    options: {
      poolsize: 20,
      db: {
        safe: true,
      },
    },
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
const config = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {},
);

module.exports = config
