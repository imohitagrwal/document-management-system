// Production specific configuration
// =================================
module.exports = {
    // Server port
    port: process.env.PORT || 3000,
  
    // MongoDB connection options
    mongo: {
      uri:
        process.env.MONGODB_URI ||
        process.env.MONGODB_URL ||
        'mongodb://localhost/tenantregistry',
    },
    encriptedToken: true,
    encriptedTokenKey: 'a-very-secretive-secret',
    encript: {
      key: process.env.ENCRIPT_KEY || 'secret',
    },
  };
  