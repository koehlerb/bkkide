// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, params } = context;
    const path = params.query.path;

    console.log( path );

    if (!path) path = "/";
    var parts = path.split("/");
    if ( !parts[0] )
      parts.shift();
    if (parts.length > 0 && !parts[parts.length - 1])
      parts.pop();

    if (parts.length == 0 ) {
      context.result = [{
        name: "/",
        size: 1,
        mtime: 0,
        ctime: 0,
        mime: "folder",
        parent: "0",
        _id: "0"
      }];
      return context;
    } else {
      var parent = "0";
      var nodes;
      var i;
      for ( i=0; i<parts.length; i++ ) {
        nodes = await app.service( 'api/nodes' ).find({
          query: {
            parent,
            name: parts[i],
            $limit: 1
          }
        });
        if ( nodes.data.length == 0 ) {
          context.result = [];
          return context;
        }
        parent = nodes.data[0]._id;
      }
      context.result = nodes.data;
    }

    return context;
  };
};
