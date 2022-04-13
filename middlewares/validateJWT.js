const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {
    
    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(400).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const loggedUser = await User.findById( uid );

        if ( !loggedUser ) {
            return res.status(401).json({
                msg: 'Logged not registered'
            });  
        }

        if ( !loggedUser.status ) { 
            return res.status(401).json({
                msg: 'Logged user is not on database'
            });  
        }

        req.loggedUser = loggedUser;

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }

}

module.exports = {
    validateJWT
}