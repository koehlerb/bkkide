// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, result } = context;

    var user = result[0];
    const email = user.email;
    const password = user.password;
    user = await app.service( 'users' ).create({
      email,
      password
    });

    // Best practice: hooks should always return the context
    return context;
  };
};
