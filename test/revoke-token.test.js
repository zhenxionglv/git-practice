const seneca = require('../index');
const expect = require('chai').expect;

const client = seneca.client({ port: 10001, host: '127.0.0.1' });
const uid = '587889400329f31e23d9ef24';
let tokenId = '';

describe('token', () => {
  it('创建token', (done) => {
    client.act('role:auth, cmd:revokeToken_create', { data: { uid } }, (err, res) => {
      expect(err).to.be.equal(null);
      expect(res.uid).to.be.equal(uid);
      tokenId = res._id;
      done();
    });
  });

  it('获取token', (done) => {
    client.act('role:auth, cmd:revokeToken_read', { data: { id: tokenId } }, (err, res) => {
      expect(err).to.be.equal(null);
      expect(res.uid).to.be.equal(uid);
      done();
    });
  });

  it('注销token', (done) => {
    client.act('role:auth, cmd:revokeToken_logout', { data: { id: uid } }, (err, res) => {
      expect(err).to.be.equal(null);
      expect(res.success).to.be.equal(true);
      done();
    });
  });
});
