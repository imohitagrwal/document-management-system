// QA specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
      uri: process.env.MONGODB_URI ||
      process.env.MONGODB_URL || 'mongodb://localhost/tenantregistry-qa',
    },
    encriptedToken: true,
    encriptedTokenKey: 'a-very-secretive-secret',
    // Seed database on startup
    seedDB: false,
};