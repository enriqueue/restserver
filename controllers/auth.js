const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');

const loginController = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify if email exists
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Email is not registered on database'
            });
        }

        // Verify if user is active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User is not active'
            });
        }
        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Password is not valid'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id );
        
        res.json({ user, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Please, contact the admin'
        });
    }
}

module.exports = {
    loginController
}