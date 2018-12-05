const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.use( '/plugins', express.static(path.join(
  app.get('public'),
  '../../c9sdk/plugins'
)));

app.use( '/static/plugins', express.static(path.join(
  app.get('public'),
  '../../c9sdk/plugins'
)));

app.use( '/static/bkkplugins', express.static(path.join(
  app.get('public'),
  'bkkplugins'
)));

app.use( '/static/lib', express.static(path.join(
  app.get('public'),
  '../../c9sdk/node_modules'
)));

app.use( '/static/lib.c9.nodeapi', express.static(path.join(
  app.get('public'),
  '../../c9sdk/plugins/c9.nodeapi'
)));

app.use( '/static/configs', express.static(path.join(
  app.get('public'),
  '../../c9sdk/configs'
)));

app.use( '/static/standalone', express.static(path.join(
  app.get('public'),
  'c9/standalone'
)));

app.use( '/static/lib/ace', express.static(path.join(
  app.get('public'),
  '../../c9sdk/plugins/node_modules/ace'
)));

app.get( '/project/:id', function( req, res ) {
  res.sendFile( path.join(
    app.get('public'),
    '../src/ide.offline.html'
  ));
});

// Set up Plugins and providers

app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
