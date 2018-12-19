define(function(require, exports, module) {
    "use strict";

    main.consumes = ["Plugin"];
    main.provides = ["bkkfeathers"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;

        var plugin = new Plugin("Ajax.org", main.consumes);

        var foobar = 1;
        var nodeCount = 0;

        const socket = io('http://localhost:3030');
        // @feathersjs/client is exposed as the `feathers` global.
        const app = feathers();

        app.configure(feathers.socketio(socket));
        //app.configure(feathers.authentication());

        function load() {
          console.log( "bkk.feathers load");
        }

        function unload() {
          console.log( "bkk.feathers unload");
        }

        plugin.on("load", load);
        plugin.on("unload", unload);

        plugin.freezePublicAPI({
            get foobar() { return foobar; },

            fcNode: function( path, create, mime, callback ) {
              if ( create ) {
                app.service('api/paths').create({
                  path,
                  mime
                }).then((stat) => {
                  callback( stat );
                });
              } else {
                app.service('api/paths').find({
                  query: {
                    path
                  }
                }).then((stats) => {
                  callback( stats.length > 0 ? stats[0] : null );
                });
              }
            },

            writeFile: function( id, value ) {
              app.service( 'api/files' ).patch( id, { value } );
              app.service( 'api/nodes' ).patch( id, { size: value.length });
            },

            rmFile: function( id ) {
              app.service( 'api/files' ).patch( id, { value } );
              app.service( 'api/nodes' ).patch( id, { size: value.length });
            },

            readFile: function( id, callback ) {
              app.service( 'api/files' ).get( id )
              .then((file) => {
                callback( file.value );
              });
            },

            readDir: function( id, callback ) {
              app.service( 'api/nodes' ).find({
                query: {
                  parent: id
                }
              }).then((nodes) => {
                callback( nodes.data );
              });
            }

        });

        register(null, {
            "bkkfeathers": plugin
        });
    }
});
