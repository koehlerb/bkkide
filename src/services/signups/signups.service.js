// Initializes the `signups` service on path `/api/signups`
const createService = require('feathers-nedb');
const createModel = require('../../models/signups.model');
const hooks = require('./signups.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/signups', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/signups');

  service.hooks(hooks);
};
