var Guachinche = require('../model/guachinche')

exports.guachincheList = function(req, res) {
    Guachinche.find({}, function(err, Guachinche) {
        if (err) 
            throw err
        console.log(Guachinche)
        res.status(200).json(Guachinche)
    })
}

