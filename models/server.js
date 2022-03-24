const express = require('express');
const cors = require('cors');
const colors = require('colors');

const { dbConnection } = require('../config/db');

class Server {

    constructor() {
        this.app = express();
        // CRUD API
        this.path = '/api/users';
        // Connect to Database
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Routes 
        this.routes();
    }
     
    async connectDB() {
        await dbConnection();
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
        this.app.listen(process.env.PORT || 3000, ()  => {
            console.log(colors.bold.green(`Server up -> ${ process.env.PORT || 3000 }`));
        });
    }

}

module.exports = Server;