var Hapi = require('hapi');
var server = new Hapi.Server();
var NunjucksHapi = require('nunjucks-hapi');
var Path = require('path');
/*********/
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'leila',
    password: 'password',
    database: 'Kouri-schema'
});
connection.connect();
// var user = {
//     username: "leila",
//     email: "@uottawa.ca",
//     password: "easyone"
// };
//
// var query = connection.query('insert into user set ?', user, function (err, result) {
//     console.log(query.sql);
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.error(result);
// });
/*********/


server.connection({host:'localhost',port:8000});

server.register(require('inert'), function(err) {

    if (err) {
        throw err;
    }

    server.route({
        method : 'GET',
        path : '/node_modules/{path*}',
        handler : {
            directory : {
                path : 'node_modules',
                listing : false,
                index : true
            }
        }
    });

    server.route({
        method : 'GET',
        path : '/static/{path*}',
        handler : {
            directory : {
                path : 'static',
                listing : false,
                index : true
            }
        }
    });

});

var plugins = [

    { register : require('vision') }, //register Vision with others Plugins
    { register : require('./app/profile/profile-server.js') }
];

server.register(plugins, (err) => {
    if (err) {
        console.log('Cannot register vision')
    }

    server.views({
        engines: {
            njk: NunjucksHapi
        },
        path: Path.join(__dirname, 'app/home/views')
        // path: Path.join(__dirname, 'app/profile/views')
    });


    server.route({
        method: 'GET',
            path: '/',
            handler: function (request, reply) {
                    reply.view('homepage',{
                        'title': 'Welcome'
                    })
                }
    });

    server.route({
        method: 'GET',
        path: '/signup',
        handler: function (request, reply) {

            reply.view('signup', {
                'title': 'Sign up!'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {

            reply.view('login', {
                'title': 'Welcome back'
            });
        }
    });

    // server.route({
    //     method: 'POST',
    //     path: '/dashboard',
    //     handler: function (request, reply) {
    //         reply.view('dashboard', {
    //             'title': 'Dashboard'
    //         });
    //     }
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/dashboard',
    //     handler: function (request, reply) {
    //         // reply.view('dashboard', {
    //         //     'title': 'Dashboard'
    //         // });
    //         reply('leilafhgjhkjlk');
    //     }
    // });


});



server.start(() => {

    console.log("Server running on", server.info.uri);
});