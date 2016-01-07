var Guachinche = require('../model/guachinche'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    request = require('request'),
    config = require('../config/config')

exports.guachincheList = function(req, res) {
    Guachinche.find({}, function(err, Guachinche) {
        if (err) 
            throw err
        console.log(Guachinche)
        res.status(200).json(Guachinche)
    })
}

exports.guachinchePost = function(req, res) {
 
    var data = {
        name: req.body['name'], 
        direction: req.body['direction'], 
        city: req.body['city'],
        description: req.body['description'],
        mailPublisher: req.body['mailPublisher'], 
        date: new Date()
    }
    
    Guachinche.count({name: req.body['name']}, function( err, count){
        if(err) throw err
        console.log( "Number of Guachinches:", count );
        if (count == 0)
        {
            Guachinche.create(data, function(err, Guachinche){
                if(err) 
                    res.status(200).json({ error: err.message })
                else 
                    res.status(201).json({ message: 'Insertado correctamente' })
            })
        }
        else
        {
            res.status(200).json({ message: 'Ya esta insertado' })
        }
    })
}

exports.guachinche = function(req, res) {
    console.log("Guachinche by id")
    Guachinche.findById(req.params.id, function(err, Guachinche) {
        if (err) 
            throw err
        console.log(Guachinche)
        res.status(200).json(Guachinche)
    })
}

exports.releases = function(req, res) {
    console.log("Publicador: " + req.params['id'])
    Guachinche.find({mailPublisher: req.params['id']}, function(err, Guachinche) {
        if (err) 
            throw err
        console.log(Guachinche)
        res.status(200).json(Guachinche)
    })
}

exports.deleteRelease = function(req, res) {
    console.log("Borrando: " + req.params['id'])
    Guachinche.remove({_id: req.params['id']}, function(err,removed) {
         if (err) 
            throw err
        res.status(200).json({ message: 'Borrado correctamente'})
    })
}

exports.googleAuth = function(req, res) {
    
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token'
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
    
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    }

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
        var accessToken = token.access_token
        var headers = { Authorization: 'Bearer ' + accessToken }
    
        // Step 2. Retrieve profile information about the current user.
        request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
            if (profile.error) {
                console.log("Error: " + profile.error.message)
                return res.status(500).send({message: profile.error.message})
            }
            // Step 3a. Link user accounts.
            if (req.headers.authorization) {
                console.log("Existing user: " + profile.sub)
                var token = createJWT(profile.sub)
                res.send({ token: token })
            } else {
                // Step 3b. Create a new user account or return an existing one.
                console.log("New user: " + profile.email)
                var token = createJWT(profile.sub)
                res.send({ token: token, email: profile.email, name: profile.name })
            }
        })
    })
}

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}