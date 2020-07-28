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
    parent : { type : String, index: true, default: "/" },
    path : { type : String , required: true, index: true},
    type : { type : String , required: true },
    content: { type: String, default: ""},
    createdBy: { type : String, required: true}
}, {
  timestamps: { createdAt: true, updatedAt: true }
});


async function getModel(userCxt) {
  const { accountId } = userCxt;
  const db = await getDB(accountId);
  // console.log(db)
  return db.model('directory', DirectorySchema);
}

module.exports = {
    getModel,
}