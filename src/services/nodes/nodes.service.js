// Initializes the `nodes` service on path `/api/nodes`
const createService = require('feathers-nedb');
const createModel = require('../../models/nodes.model');
const hooks = require('./nodes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/nodes', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/nodes');

  service.hooks(hooks);
};
