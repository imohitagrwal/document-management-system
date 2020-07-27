const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  accountName: { type: String },
  uri: {
    dms: { type: String, required: true },
  },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.connection.model('accounts', AccountSchema);