require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGO_CNN );

        console.log(colors.bold.green('Connected to MongoDB'));

    } catch (error) {
        console.log(colors.red(error));
        throw new Error('Error connecting to database');
    }    
}

module.exports = {
    dbConnection
}