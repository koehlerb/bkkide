const crypto = require('crypto');
const request = require('request-promise-native');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;

    // Throw an error if we didn't get an email address or captcha
    if(!data.email || !data.password || !data.captcha ) {
      throw new Error('missing email, password, or capthca');
    }

    const emailParts = data.email.trim().split( "@" );
    if ( emailParts.length != 2 ||
         (emailParts[1] != 'langara.ca' &&
          emailParts[1] != 'mylangara.bc.ca') ) {
      throw new Error('invalid email address');
    }

    var body = await request.post( 'https://www.google.com/recaptcha/api/siteverify',
      {form: {
        secret: app.get( 'RECAPTCHA_API_KEY' ),
        response: data.captcha
      }} );

    body = JSON.parse(body);
    if ( !body.success ) {
      throw new Error( 'did not solve captcha');
    }

    const email = data.email.trim();
    const password = data.password;
    const activationKey = crypto.randomBytes( 16 ).toString( 'hex' );
    const createdAt = new Date();

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      email,
      password,
      activationKey,
      createdAt
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
