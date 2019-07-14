'use strict';
/*
 * Utility - utility.js
 * Author: smartData Enterprises
 * Date: 09 fab 2018
 */
var constantsObj = require('./../../constants');
var mongoose = require('mongoose');
var crypto = require('crypto'),
    algorithm = constantsObj.config.cryptoAlgorithm,
    password = constantsObj.config.cryptoPassword;
var nodemailer = require('nodemailer');
var fs = require("fs");
var path = require('path');
var config = require('../../config/config.js')
var nodemailer = require('nodemailer');
var async = require('async');
var FCM = require('fcm-node');
var apn = require('apn');
process.env.DEBUG = 'apn';
var shortid = require('shortid');
var User = require('../models/users');
var co = require("co");
var jwt = require('jsonwebtoken');
var mkdirp = require('mkdirp');
var utility = {};

utility.getEncryptText = function(text) {
    var cipher = crypto.createCipher(algorithm, password);
    text = cipher.update(text, 'utf8', 'hex');
    text += cipher.final('hex');
    return text;
}
utility.notEmpty = function(data) {
    var res = true;
    var dataType = typeof data;
    switch (dataType) {
        case 'object':
        case 'array':
            if (data == null || data.length < 1)
                res = false;
            break;

        case 'undefined':
            res = false;
            break;

        case 'number':
            if (data == "")
                res = false;
            break;
        case 'string':
            if (data.trim() == "")
                res = false;
            break;
    }
    return res;
}
utility.getDecryptText = function(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var text = decipher.update(text, 'hex', 'utf8')
    text += decipher.final('utf8');
    return text;
}





utility.fileExistCheck = function(path, callback) {
    fs.exists(path, function(err) {
        if (err) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

utility.validationErrorHandler = function(err) {
    var errMessage = constantsObj.validationMessages.internalError;
    if (err.errors) {
        for (var i in err.errors) {
            errMessage = err.errors[i].message;
        }
    }
    return errMessage;
}



module.exports = utility;