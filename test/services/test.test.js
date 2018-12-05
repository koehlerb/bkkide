const assert = require('assert');
const app = require('../../src/app');

describe('\'test\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/test');

    assert.ok(service, 'Registered the service');
  });
});
