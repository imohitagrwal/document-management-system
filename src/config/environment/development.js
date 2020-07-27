// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
      uri: process.env.MONGODB_URI ||
      process.env.MONGODB_URL ||
      'mongodb://localhost:27017/tenantregistry-dev',
    },
    encriptedToken: true,
    encriptedTokenKey: 'a-very-secretive-secret',
    // Seed database on startup
    seedDB: true,
    encript: {
      key: 'secret',
    },
  };