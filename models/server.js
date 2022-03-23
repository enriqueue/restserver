const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        // CRUD API
        this.path = '/api/users';
        // Middlewares
        this.middlewares();
        // Routes 
        this.routes();
    }

    middlewares() {
        // Parse
        this.app.use( express.json() );
        // Cors
        this.app.use( cors() );
    }

    routes() {
        this.app.use(this.path, require('../routes/routes'));
    }

    listen() {
        this.app.listen(process.env.PORT || 8080, ()  => {
            console.log(`Server up -> ${ process.env.PORT || 8080 }`);
        });
    }

}

module.exports = Server;