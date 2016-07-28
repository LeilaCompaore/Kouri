/**************************************************
 * Configuring Employees Plugins
 **************************************************/
/**
 * Register Plugins
 */
var NunjucksHapi = require('nunjucks-hapi');
var Path = require('path');

exports.register = function(server, options, next) {

    server.views({
        engines: {
            njk: NunjucksHapi
        },
        path: Path.join(__dirname, 'views')
    });

    server.route([
        {
            method : 'GET',
            path : '/dashboard',
            handler: function (request, reply) {
                reply.view('dashboard', {
                    'title': 'Dashboard'
                });
            }
        }
    ]);

    server.route([
        {
            method : 'GET',
            path : '/profile',
            handler: function (request, reply) {
                reply.view('profile', {
                    'title': 'Profile'
                });
            }
        }
    ]);

    next();
};

/**
 * Plugin attributes...
 * we have here the Name and the Version of the plugin
 */
exports.register.attributes = {

    name : 'ProfileModule',
    version : '1.0.0'
};