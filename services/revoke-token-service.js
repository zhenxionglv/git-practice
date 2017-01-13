const mongoose = require('mongoose');

const RevokeToken = mongoose.model('RevokeToken');

class RevokeTokenService {
  // 写入token
  static setRevokeToken(msg, done) {
    new RevokeToken({
      uid: msg.data.uid,
    })
      .save()
      .then(token => done(null, token.toObject()))
      .catch(done);
  }

  // 查询token
  static getRevokeToken(msg, done) {
    RevokeToken
      .findById(msg.data.id)
      .then(token => done(null, token.toObject()))
      .catch(done);
  }
}

exports = module.exports = RevokeTokenService;
