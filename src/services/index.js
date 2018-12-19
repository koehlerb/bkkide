const test = require('./test/test.service.js');
const paths = require('./paths/paths.service.js');
const nodes = require('./nodes/nodes.service.js');
const files = require('./files/files.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(test);
  app.configure(paths);
  app.configure(nodes);
  app.configure(files);
};
