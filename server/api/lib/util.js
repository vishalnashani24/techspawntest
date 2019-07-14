'use strict';

var jwt = require('jsonwebtoken'),
    constantsObj = require('./../../constants'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    
    config = require('../../config/config.js');
module.exports = {
    ensureAuthorized: ensureAuthorized
}

var caccess=['m','l','d'];
var maccess=['l','d'];
var laccess=['d'];
var daccess=[];

function ensureAuthorized(req, res, next) {
    console.log('14ggggggggggggggpppppppppppp',req.originalUrl, req.query.type ,req.body.type)
    var unauthorizedJson = {code: 401, 'message': 'Unauthorized', data: {}};
    var notPermitedJson = {code: 402, 'message': 'Requested resource not permitted to you', data: {}};
    if (req.headers.authorization) {
        var token = req.headers.authorization;
        var splitToken = token.split(' ');
        try {
            token = splitToken[1];
            if (splitToken[0] == 'admin_bearer') {
                var decoded = jwt.verify(token, constantsObj.config.secret);
                console.log('2222222222222222222',decoded)
                if(decoded){
                    req.user = decoded;
                    User.findById(req.user.uid).exec(function(err, admin) {
                        if (err)
                            res.json(unauthorizedJson);
                        else if (!admin)
                            res.json(unauthorizedJson);
                        else {
                            switch(decoded.type) {
                              case 'd':
                               if(daccess.includes(req.query.type||req.body.type)){
                                next()
                               }else{
                                 res.json(notPermitedJson);
                               }
                              break;
                              case 'm':
                               if(maccess.includes(req.query.type||req.body.type)){
                                
                                next()
                               }else{
                                
                                 res.json(notPermitedJson);
                               }
                                break;
                              case 'l':
                               if(laccess.includes(req.query.type||req.body.type)){
                                next()
                               }else{
                                 res.json(notPermitedJson);
                               }
                                break;
                               case 'c':
                              if(caccess.includes(req.query.type||req.body.type)){
                                next()
                               }else{
                                 res.json(notPermitedJson);
                               }
                                break;
                                case 'admin':
                              next()
                                break;
                              
                            }
                            
                        }
                            
                    });
                 }else{
                     res.json(unauthorizedJson);
                 }
                        
                
            } else if (splitToken[0] == 'Bearer') {
                User.findOne({ deviceInfo: {$elemMatch: {access_token: token}}, deleted: false }, 'email').exec(function(err, user) {
                    if (err || !user) {
                        res.json(unauthorizedJson);
                    } else {
                        req.user = user;
                        next();
                    }
                });
            } else {
                res.json(unauthorizedJson);
            }
        } catch (err) {
            res.json(unauthorizedJson);
        }
    } else {
        res.json(unauthorizedJson);
    }
}
