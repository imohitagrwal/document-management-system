const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  accountName: { type: String },
  uri: {
    dms: { type: String, required: true },
  },
  active: { type: Boolean, default: true },
});

module.exports.default = mongoose.connection.model('connections', ConnectionSchema);