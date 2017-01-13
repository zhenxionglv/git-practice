const seneca = require('seneca');
const nconf = require('nconf');

nconf.argv().env();
const env = process.env.NODE_ENV || 'development';
const Xlog = require('xyj-logger');

Xlog.config(nconf.get('logger'));
const logger = Xlog.Logger('logs');
nconf.file({ file: `config.${env}.json` });
require('./mongoose');

const revikeTokenregister = require('./register/revoke-token-register');

function log() {
  this.sub('role:auth, cmd:*', (msg) => {
    const inputMsg = { role: msg.role, cmd: msg.cmd, data: msg.data };
    logger.debug(inputMsg);
  });
}

seneca({ log: { level: 'error+' } })
  .use(log)
  .use(revikeTokenregister)
  .listen({ type: 'http', port: nconf.get('seneca:auth:port') });
