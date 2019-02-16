const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const sendActivationEmail = require('../../hooks/send-activation-email');

const checkNewUser = require('../../hooks/check-new-user');

const activateNewUser = require('../../hooks/activate-new-user');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [checkNewUser(), hashPassword()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [protect('password')],
    get: [protect('password')],
    create: [sendActivationEmail(),protect('password')],
    update: [protect('password')],
    patch: [protect('password')],
    remove: [activateNewUser(),protect('password')]
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
