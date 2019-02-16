// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;

    const msg = {
      to: data.email,
      from: app.get( 'SENDGRID_SENDER' ),
      subject: 'codepool: activate account',
      text: 'Follow this link to activate your account: '
            + app.get( 'CODEPOOL_BASE_URL' )
            + '/activate/'
            + context.data.activationKey
    };
    app.get( 'SGMAIL' ).send(msg);

    // Best practice: hooks should always return the context
    return context;
  };
};
