const { request, response } = require('express');

const bcrypt = require('bcryptjs');
const User = require('../models/user');  

const getController = async(req = request, res = response) => {

    const { limit = 15, desde = 0 } = req.query;
    const query = { status: true }

    const [total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )   
            .limit( limit )
            .skip( desde )
    ]);

    res.json( {total, users} );
}

const postController = async(req = request, res = response) => {
    
    const { name, email, password, role } = req.body;

    const user = new User({name, email, password, role});

    // Encrypting password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    // Saving new user in db
    await user.save();

    res.json( user );
}

const putController = async(req = request, res = response) => {
    
    const { id } = req.params;

    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        // Encrypting password
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json( user );
}

const deleteController = async(req = request, res = response) => {
    
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json( user );
}

module.exports = {
    getController, 
    postController, 
    putController, 
    deleteController
}