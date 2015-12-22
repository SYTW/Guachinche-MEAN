var express = require('express'),
    router  = express.Router(),
    apiController = require('../controllers/apicontroller');

router.get('/guachinches', apiController.guachincheList);
router.post('/guachinches', apiController.guachinchePost);
router.get('/guachinches/:id', apiController.guachinche);

module.exports = router;