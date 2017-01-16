const mongoose = require('mongoose');

const RevokeToken = mongoose.model('RevokeToken');

class RevokeTokenService {
  /**
   * 登录成功后根据用户id创建token
   * @param msg
   * @param done
   */
  static setRevokeToken(msg, done) {
    if (!msg.data) {
      return done(new Error('token:缺少必须的参数msg.data'));
    }
    return new RevokeToken({
      uid: msg.data.uid,
    })
      .save()
      .then(token => done(null, token.toObject()))
      .catch(done);
  }

  /**
   * 根据id查询token信息返回
   * @param msg
   *  * data {Object} 传入数据
   * @param done
   */
  static getRevokeToken(msg, done) {
    if (!msg.data) {
      return done(new Error('token:缺少必须的参数msg.data'));
    }
    return RevokeToken
      .findById(msg.data.id)
      .then(token => done(null, token.toObject()))
      .catch(done);
  }

  /**
   * 根据用户id注销token
   * @param msg
   *  * data {Object} 传入数据
   * @param done
   * @returns {*}
   */
  static logoutRevokeToken(msg, done) {
    if (!msg.data) {
      return done(new Error('token:缺少必须的参数msg.data'));
    }
    return RevokeToken
      .update({ uid: msg.data.id, active: true }, { $set: { active: false } }, { multi: true })
      .then(() => done(null, { success: true }))
      .catch(done);
  }
}

exports = module.exports = RevokeTokenService;
