

const createPath = require('../../hooks/create-path');

const findPath = require('../../hooks/find-path');

module.exports = {
  before: {
    all: [],
    find: [findPath()],
    get: [],
    create: [createPath()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
