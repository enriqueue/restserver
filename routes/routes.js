const { Router } = require('express');

const router = new Router;

const { getController,
        postController, 
        putController,
        deleteController } = require('../controllers/routesCtrl');


router.get('', getController);

router.post('', postController);

router.put('', putController);

router.delete('', deleteController);

module.exports = router;