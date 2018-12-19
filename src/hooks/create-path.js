// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;
    const path = data.path;

    if (!path) path = "/";
    var parts = path.split("/");
    if ( !parts[0] )
      parts.shift();
    if (parts.length > 0 && !parts[parts.length - 1])
      parts.pop();

    if (parts.length == 0 ) {
      context.data = {
        name: "/",
        size: 1,
        mtime: 0,
        ctime: 0,
        mime: "folder",
        parent: "0",
        _id: "0"
      };
    } else {
      var parent = "0";
      var node;
      var nodes;
      var file;
      var i;
      for ( i=0; i<parts.length; i++ ) {
        nodes = await app.service( 'api/nodes' ).find({
          query: {
            parent,
            name: parts[i],
            $limit: 1
          }
        });
        if ( i<parts.length - 1 && nodes.data.length == 0 ) {
          node = await app.service( 'api/nodes' ).create({
            parent,
            name: parts[i],
            size: 0,
            mtime: Date.now(),
            ctime: Date.now(),
            mime: "folder"
          });
        } else if ( i<parts.length - 1 ) {
          node = nodes.data[0];
          if ( node.mime != "folder" ) {
            throw new Error( 'Invalid path' );
          }
        } else if ( nodes.data.length == 0 ) {
          node = await app.service( 'api/nodes' ).create({
            parent,
            name: parts[i],
            size: 0,
            mtime: Date.now(),
            ctime: Date.now(),
            mime: data.mime
          });
          if ( data.mime != "folder" ) {
            file = await app.service( 'api/files' ).create({
              _id: node._id,
              value: ""
            });
          }
        } else {
          node = nodes.data[0];
        }
        parent = node._id;
      }

      context.data = node;
    }

    return context;
  };
};
