const assert = require('assert');
const app = require('../../src/app');

describe('\'paths\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/paths');

    assert.ok(service, 'Registered the service');
  });
});
