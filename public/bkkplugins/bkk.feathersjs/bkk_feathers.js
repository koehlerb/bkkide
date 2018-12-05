define(function(require, exports, module) {
    "use strict";

    main.consumes = ["Plugin"];
    main.provides = ["bkkfeathers"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var plugin = new Plugin("Ajax.org", main.consumes);

        var foobar = 1;

        const socket = io('http://localhost:3030');
        // @feathersjs/client is exposed as the `feathers` global.
        const app = feathers();

        app.configure(feathers.socketio(socket));
        //app.configure(feathers.authentication());

        function load() {
          console.log( "bkk.feathers load");
          app.service('api/test').create({
            text: 'A new message'
          });
        }

        function unload() {
          console.log( "bkk.feathers unload");
        }

        plugin.on("load", load);
        plugin.on("unload", unload);

        plugin.freezePublicAPI({
            get foobar() { return foobar; },

            test: function(path) {
                console.log( "path: " + path );
            },
        });

        register(null, {
            "bkkfeathers": plugin
        });
    }
});
