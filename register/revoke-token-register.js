const RevokeTokenService = require('../services/revoke-token-service');

function revokeToken() {
  // 添加token
  this.add('role:auth, cmd:revokeToken_create', (msg, done) => {
    RevokeTokenService.setRevokeToken(msg, done);
  });

  // 查询token
  this.add('role:auth, cmd:revokeToken_read', (msg, done) => {
    RevokeTokenService.getRevokeToken(msg, done);
  });
}

exports = module.exports = revokeToken;
