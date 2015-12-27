var express = require('express'),
    router  = express.Router(),
    apiController = require('../controllers/apicontroller');

router.get('/guachinches', apiController.guachincheList);
router.post('/guachinches', apiController.guachinchePost);
router.get('/guachinches/:id', apiController.guachinche);
router.post('/auth/google', apiController.googleAuth)

module.exports = router;