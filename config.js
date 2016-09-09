var projectDir = __dirname,
    directories = {
        project: projectDir,
        controllers: projectDir + '/controllers',
        templates: projectDir + '/templates',
        routes: projectDir + '/routes',
        extfile: projectDir + '/publics' 
    };

var Config = {
    directories: directories,

    routes: directories.routes + '/routes',

    database: {
        path: projectDir + '/db/db.json'
    },

    controllers: {
        home: directories.controllers + '/home',
        form: directories.controllers + '/form',
        items: directories.controllers + '/items',
        extfile: directories.controllers + '/extfile'
    },

    getController: function(name) {
        return this.controllers.hasOwnProperty(name) ? require(this.controllers[name]) : false;
    },

    getRoutes: function() {
        return require(this.routes);
    }
};

module.exports = Config;
