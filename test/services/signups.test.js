const assert = require('assert');
const app = require('../../src/app');

describe('\'signups\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/signups');

    assert.ok(service, 'Registered the service');
  });
});
