const { request, response } = require("express");

const validateRoles = (req = request, res = response, next) => {

    const { role, name } = req.loggedUser;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not admin`
        });
    }

    next();
}

module.exports = {
    validateRoles
}