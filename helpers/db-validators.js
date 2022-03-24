const User = require('../models/user');
const Role = require('../models/role');

const isRoleInDB = async(role = '') => {

    const isRoleValid = await Role.findOne({ role });

    if ( !isRoleValid ) {
        throw new Error(`Role -> ${ role } is not registered on database`);
    }
}

const isEmailInDB = async( email ) => {

    const isEmailValid = await User.findOne({ email });

    if ( isEmailValid ) {
        throw new Error(`Email -> ${ email } is registered in DB already`);
    }
}

const isIDInDB = async( id ) => {

    const isIDvalid = await User.findById( id );

    if ( !isIDvalid ) {
        throw new Error(`ID -> ${ id } is not registered`);
    }
}

module.exports = {
    isRoleInDB, 
    isEmailInDB,
    isIDInDB
}