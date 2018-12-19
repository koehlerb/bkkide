// Initializes the `paths` service on path `/api/paths`
const createService = require('./paths.class.js');
const hooks = require('./paths.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/paths', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/paths');

  service.hooks(hooks);
};
