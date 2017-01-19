const seneca = require('seneca');
const nconf = require('nconf');

// 根据环境变量获取config文件
nconf.argv().env();
const env = process.env.NODE_ENV || 'development';
const Xlog = require('xyj-logger');

Xlog.config(nconf.get('logger'));
const logger = Xlog.Logger('logs');
nconf.file({ file: `config.${env}.json` });
require('./mongoose');

// 注册seneca服务
const revikeTokenregister = require('./register/revoke-token-register');

// 所有服务入口log打印
function log() {
  this.sub('role:auth, cmd:*', (msg) => {
    const inputMsg = { role: msg.role, cmd: msg.cmd, data: msg.data };
    logger.debug(inputMsg);
  });
}

// 启动服务
module.exports = seneca({ log: { level: nconf.get('senecaLogLevel') } })
  .use(log)
  .use(revikeTokenregister)
  .listen({ type: 'http', port: nconf.get('seneca:auth:port') });
