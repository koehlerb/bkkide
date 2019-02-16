const crypto = require('crypto');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a title
    if(!data.title) {
      throw new Error('A project must have a title');
    }

    // The authenticated user
    const user = context.params.user;
    // The actual project title
    const title = context.data.title
      // Titles can't be longer than 400 characters
      .substring(0, 400);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      title,
      // set the URL identifier
      urlKey: crypto.randomBytes( 16 ).toString( 'hex' ),
      // Set the user id
      userId: user._id,
      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
