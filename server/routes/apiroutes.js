var express = require('express'),
    router  = express.Router(),
    apiController = require('../controllers/apicontroller');

router.get('/guachinches', apiController.guachincheList);


module.exports = router;