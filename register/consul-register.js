const Consul = require('consul');
const nconf = require('nconf');

function register() {
  const consul = Consul({ host: nconf.get('consul:host') || '127.0.0.1', port: nconf.get('consul:port') || 8500 });
  const opts = {
    name: nconf.get('consul:name'),
    tags: nconf.get('consul:tags'),
    address: nconf.get('consul:address'),
    port: nconf.get('seneca:auth:port'),
  };
  consul.agent.service.register(opts, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`-------服务注册成功：名称－${opts.name}、地址－${opts.address}、端口－${opts.port}`);
    }
  });
}

exports = module.exports = register;
