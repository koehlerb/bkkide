define(function(require, exports, module) {
    "use strict";

    main.consumes = ["Plugin", "ace"];
    main.provides = ["bkkmonitor"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var ace = imports.ace;

        var plugin = new Plugin("Ajax.org", main.consumes);

        var foobar = 1;

        function regChangeHandler( aceSession ) {
          aceSession.doc.on( "change", function( delta ) {
            console.log( "*** A document changed!" );
            console.log( delta );
          }, true );
        }

        function load() {
          console.log( "bkk.monitor load");
          ace.on("initAceSession", function(e) {
              var doc = e.doc;
              var path = doc.tab.path;
              console.log( "*** initAceSession: " + path );
              regChangeHandler( doc.getSession().session );
              //var otDoc = documents[path];
              //if (otDoc && !otDoc.session)
              //    otDoc.setSession(doc.getSession().session);
          });
        }

        function unload() {
          console.log( "bkk.monitor unload");
        }

        plugin.on("load", load);
        plugin.on("unload", unload);

        plugin.freezePublicAPI({
            get foobar() { return foobar; },

            foobaz: function( ) {
              console.log( "*** foobaz" );
            },

        });

        register(null, {
            "bkkmonitor": plugin
        });
    }
});
