const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RevokeTokenSchema = new Schema({
  uid: String, // 用户id
  active: { // token是否有效
    type: Boolean,
    default: true,
  },
  timestamp: { // 创建token的时间
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('RevokeToken', RevokeTokenSchema);
