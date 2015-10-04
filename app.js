// jshint node: true
'use strict';

var gmeConfig = require('./config'),
    Express = require('express'),
    path = require('path'),
    //webgme = require('webgme'),
    myServer,
    app;

app = new Express();
// Expose the src/client directories
app.use(Express.static(path.join(__dirname, 'node_modules', 'webgme', 'src', 'client')));

// Expose the common directories
app.use('/common', Express.static(path.join(__dirname, 'node_modules', 'webgme', 'src', 'common')));

// Expose the plugin directories
app.use('/plugin', Express.static(path.join(__dirname, 'node_modules', 'webgme', 'src', 'plugin')));

// Add extra json files
app.get('/gmeConfig.json', function(req, res) {
    res.json(gmeConfig);
});
app.get('/package.json', function(req, res) {
    // TODO: Find out what we actually need here
    res.json(require(__dirname+'/package.json'));
});

// Add the /api stuff
// visualizers json
app.get('/api/visualizers', function(req, res) {
    var vizPath = path.join(__dirname, 'node_modules', 'webgme', 'src', 'client',
    'js', 'Visualizers.json');
    res.json(require(vizPath));
});


// seed names array
app.get('/api/seeds', function(req, res) {
    res.json(['EmptyProject']);
});

// plugin names array
app.get('/api/plugins', function(req, res) {
    res.json([]);
});

// decorator names array
app.get('/api/decorators', function(req, res) {
    res.json([]);
});

var defUser = {
    _id: "guest",
    email: "guest",
    canCreate: true,
    projects: {
        // I will try to mock the loading of this project
        'guest+project': {
            read: true,
            write: true,
            delete: true
        },
    },
    type: "User",
    orgs: [ ],
    siteAdmin: null
};

app.get('/api/users/guest', function(req, res) {
    return res.json(defUser);
});

//myServer = new webgme.standaloneServer(gmeConfig);
//myServer.start(function () {
    //console.log('server up');
//});
app.listen(8081)
console.log('server started!');
