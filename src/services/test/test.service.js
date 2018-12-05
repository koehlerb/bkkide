// Initializes the `test` service on path `/api/test`
const createService = require('feathers-nedb');
const createModel = require('../../models/test.model');
const hooks = require('./test.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/test', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/test');

  service.hooks(hooks);
};
