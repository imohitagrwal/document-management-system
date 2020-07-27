const mongoose = require('mongoose');
const Connections = require('./masterdb.model');

mongoose.Promise = require('bluebird');

// Global DB stack
const dbStack = {};

/**
 * getDB - function to get a db connection instance for a particuler institute
 *
 * @param  {String} accountId accountId
 * @return {DB Connection}      Db connection instance for that institute
 */
async function getDB(accountId) {
  // console.info(accountId);
  
  if (dbStack[accountId]) {
    dbStack[accountId].timeStamp = Date.now();
    // console.info('DB Connections', Object.keys(dbStack));
    return dbStack[accountId].db;
  }

  const connection = await Connections.findOne({ accountId });
  console.log('accountId', accountId)
  dbStack[accountId] = {};
  dbStack[accountId].db = await mongoose.createConnection(connection.uri.dms, { poolsize: 20 });
  console.info('New Connection Created to', connection.uri.dms);
  dbStack[accountId].timeStamp = Date.now();
  // console.info('DB Connections', Object.keys(dbStack));
  return dbStack[accountId].db;
}

module.exports = {
  getDB,
};
