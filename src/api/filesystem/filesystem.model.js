/**
 *@description
 *    This File contains the Mongoose Schema defined for Directory
 * @Author :
 *   Mohit Agarwal
 * @date
 *    XX/XX/2020
 */

const mongoose = require('mongoose');
const  getDB = require('../../db').getDB;

const DirectorySchema = new mongoose.Schema({
    parent : { type : String, required : true , index: true },
    path : { type : String , default : null, required: true },
    type : { type : String , required: true },
    createdBy: { type : String, required: true}
}, {
  timestamps: { createdAt: true, updatedAt: true }
});


async function getModel(userCxt) {
  const { accountId } = userCxt;
  const db = await getDB(accountId);
  return db.model('directory', DirectorySchema);
}

module.exports = {
    getModel,
}