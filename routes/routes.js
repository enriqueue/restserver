const { Router } = require('express');
const { check } = require('express-validator');

const { getController,
        postController, 
        putController,
        deleteController } = require('../controllers/routesCtrl');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateRoles } = require('../middlewares/validateRoles');

const { isRoleInDB, isEmailInDB, isIDInDB } = require('../helpers/db-validators');

const router = Router();

router.get('/', getController);

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must have at least 4 letters').isLength({ min: 4 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( isEmailInDB ),
    check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
    check('role').custom( isRoleInDB ),
    validateFields
], postController);

router.put('/:id',[
    check('id','ID is not a valid mongo id').isMongoId(),
    check('id').custom( isIDInDB ),
    check('role').custom( isRoleInDB ),
    validateFields
], putController);

router.delete('/:id',[
    validateJWT,
    validateRoles,
    check('id','ID is not a valid mongo id').isMongoId(),
    check('id').custom( isIDInDB ),
    validateFields
], deleteController);

module.exports = router;