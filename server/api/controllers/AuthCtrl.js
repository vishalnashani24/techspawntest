'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    Response = require('../lib/response.js'),
    utility = require('../lib/utility.js'),
    config = require('../../config/config.js'),
    common = require('../../config/common.js'),
    async = require('async'),
    constantsObj = require('./../../constants');


module.exports = {
    userRegister: userRegister,
    userLogin: userLogin,
    adminLogin: adminLogin,
    userLogOut: userLogOut,
    loggedin: loggedin,
    adminRagistration: adminRagistration
};


function userRegister(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.requiredFieldsMissing));
    } else if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.invalidEmail));
    } else {
        User.existCheck(req.body.email, '', function(err, exist) {
            if (err) {
                return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
            } else {
                if (exist != true) {
                    return res.json(Response(402, "failed", exist));
                } else {
                    var date = new Date();
                    var verifingLink = utility.getEncryptText(Math.random().toString(4).slice(2) + date.getTime());
                    var obj = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email.toLowerCase(),
                        password: utility.getEncryptText(req.body.password),
                        verifying_token: verifingLink
                    };
                    new User(obj).save(function(err, userData) {
                        if (err) {
                            return res.json(Response(500, "failed", utility.validationErrorHandler(err), err));
                        } else {
                            var userMailData = { email: userData.email, firstname: userData.firstname, lastname: userData.lastname, verifying_token: userData.verifying_token, password: req.body.password };
                            //utility.readTemplateSendMail(userData.email, constantsObj.emailSubjects.verify_email, userMailData, 'verify_email', function(err, resp) {});
                            return res.json(Response(200, "success", constantsObj.messages.signupSuccess, { _id: userData._id }));
                        }
                    });
                }
            }
        });
    }
}


function userLogin(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.requiredFieldsMissing));;
    } else if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.invalidEmail));
    } else {
        
            var jwtToken = null;
            var passEnc = utility.getEncryptText(req.body.password);
            var userData = {
                email: req.body.email.toLowerCase(),
                password: passEnc,
                deleted: false
            };
            User.findOne(userData, { password: 0, updatedAt: 0, createdAt: 0, verifying_token: 0, deleted: 0 })
                .exec(function(err, userInfo) {
                    if (err) {
                        res.json({ code: 402, message: 'Request could not be processed. Please try again.', data: {} });
                    } else {
                        if (userInfo != null) {
                            if (userInfo.status == 'Inactive') {
                                res.json({ code: 402, message: 'Your account not activated yet.', data: {} });
                            } else if (userInfo.deleted == true) {
                                res.json({ code: 402, message: 'Your account has been deleted.', data: {} });
                            } else {
                                var expirationDuration = 1000 * 60 * 60 * 48 * 2; //60 * 60 * 8 * 1; // expiration duration 8 Hours
                                //var expirationDuration = 60; // expiration duration 1 minute
                                var params = {
                                    id: userInfo._id
                                }
                                jwtToken = jwt.sign(params, constantsObj.config.secret, {
                                    expiresIn: expirationDuration
                                });
                                userInfo.token = jwtToken;
                                 return res.json({ code: 200, message: 'User info fetched successfully.', data: userInfo,token:jwtToken });
                            }
                        } else {
                            res.json({ code: 402, message: 'User email or password are not correct.', data: {} });
                        }

                    }
                });
            // }
     
    }
}


function adminLogin(req, res) {
    if (validator.isNull(req.body.email) || !req.body.email) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.emailRequired));
    } else if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.invalidEmail));
    } else if (validator.isNull(req.body.password) || !req.body.password) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.passwordRequired));
    } else {
        var passEnc = utility.getEncryptText(req.body.password);
        User.findOne({ email: req.body.email, password: passEnc })
            .lean()
            .exec(function(err, admin) {
                if (err) {
                    return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
                } else {
                    if (!admin) {
                        return res.json(Response(402, "failed", constantsObj.validationMessages.invalidEmailOrPassword, err));
                    } else {
                        var user = {}
                        user.uid = admin._id
                        user.type= admin.usertype
                        var tokendata = {
                            "_id": admin._id,
                            "firstname": admin.firstname,
                            "lastname": admin.lastname,
                            "email": admin.email,
                            "createdAt": admin.createdAt,
                            "type":admin.usertype
                        };
                        var token = jwt.sign(user, constantsObj.config.secret, {
                            expiresIn: 1000 * 60 * 60 * 24 * 2
                        });
                        console.log('token',token)
                        var usData = {
                            'user': tokendata,
                            'token': token
                        }
                        return res.json(Response(200, "success", constantsObj.messages.loginSuccess, usData));
                    }
                }
            });
    }
}






function userLogOut(req, res) {
    if (!req.body.userId || !req.body.deviceToken) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.requiredFieldsMissing));
    } else {
        var userId = req.body.userId;
        User.findById(userId).exec(function(err, user) {
            if (err) {
                return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, {}));
            } else {
                if (user) {
                    var index = 'index';
                    if (user.deviceInfo.length > 0) {
                        for (var i in user.deviceInfo) {
                            if (user.deviceInfo[i].deviceToken == req.body.deviceToken) {
                                index = i;
                            }
                        }
                    }
                    if (index != 'index') {
                        user.deviceInfo.splice(index, 1);
                    }
                    user.save(function(err, data) {
                        if (err) {
                            return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, {}));
                        } else {
                            return res.json(Response(200, "success", constantsObj.messages.logoutSuccess, {}));
                        }
                    });
                } else {
                    return res.json(Response(402, "failed", constantsObj.validationMessages.userNotFound, {}));
                }
            }
        });
    }
}


function adminRagistration(req, res) {
    var obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        password: utility.getEncryptText(req.body.password),
    };
    new Admin(obj).save(function(err, userData) {
        if (err) {
            return res.json(Response(500, "failed", utility.validationErrorHandler(err), err));
        } else {
            return res.json(Response(200, "success", "Admin Ragistration successfull", { _id: userData._id }));
        }
    });
}


function loggedin(req, res) {
    // success callback for the Authentication
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            jwt.verify(parts[1], constantsObj.config.secret, function(err, user) {
                if (err) {
                    res.json(Response(402, "Failure", constantsObj.messages.authenticationFailed));
                } else {
                    if (user) {
                         res.json({
                                    "code": 200,
                                    status: "OK",
                                    data: { user: user }
                                });
                        // Admin.findById(user.uid).exec(function(err, admin) {
                        //     if (err) {
                        //         res.json(Response(402, "Failure", constantsObj.messages.authenticationFailed));
                        //     } else if (!admin) {
                        //         res.json(Response(402, "Failure", constantsObj.messages.authenticationFailed));
                        //     } else
                        //         res.json({
                        //             "code": 200,
                        //             status: "OK",
                        //             data: { user: admin }
                        //         });
                        // });
                    } else {
                        res.json(Response(402, "Failure", constantsObj.messages.authenticationFailed));
                    }
                }
            });
        } else {
            res.json(Response(402, "Failure", constantsObj.messages.authenticationFailed));
        }
    } else {
        res.json(Response(402, "Failure", constantsObj.messages.authenticationFailed));
    }
}