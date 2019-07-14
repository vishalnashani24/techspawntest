'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Response = require('../lib/response.js'),
    formidable = require('formidable'),
    util = require('util'),
    fs = require('fs-extra'),
    path = require('path'),
    utility = require('../lib/utility.js'),
    constantsObj = require('./../../constants'),
    config = require('../../config/config.js'),
    validator = require('validator'),
    async = require('async'),
    co = require('co'),
    common = require('../../config/common.js');

module.exports = {
    addUserByAdmin: addUserByAdmin,
    getUserById: getUserById,
    deleteUserById: deleteUserById,
    dashboardCount: dashboardCount,
    updateUser: updateUser,
    getAllUser: getAllUser
};


function addUserByAdmin(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.requiredFieldsMissing));;
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
                        salary:req.body.salary,
                        usertype:req.body.type
                        // verifying_token: verifingLink
                    };
                    new User(obj).save(function(err, userData) {
                        if (err) {
                            return res.json(Response(500, "failed", utility.validationErrorHandler(err), err));
                        } else {
                            // , verifying_token: userData.verifying_token, password: req.body.password 
                            var userMailData = { email: userData.email, firstname: userData.firstname, lastname: userData.lastname };
                            // utility.readTemplateSendMail(userData.email, constantsObj.emailSubjects.verify_email, userMailData, 'verify_email', function(err, resp) {});
                            return res.json(Response(200, "success", constantsObj.messages.userCreateByAdmin, { _id: userData._id }));
                        }
                    });
                }
            }
        });
    }
}

function updateUser(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.userId) {
        return res.json(Response(402, "failed", constantsObj.validationMessages.requiredFieldsMissing));;
    } else {
        User.findById(req.body.userId).exec(function(err, userInfoData) {
            if (err || !userInfoData) {
                return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
            } else {
                userInfoData.firstname = req.body.firstname;
                userInfoData.lastname = req.body.lastname;
                userInfoData.save(function(err, userData) {
                    if (err) {
                        return res.json(Response(500, "failed", utility.validationErrorHandler(err), {}));
                    } else {
                        return res.json(Response(200, "success", constantsObj.messages.userUpdatedSuccess, { _id: userData._id }));
                    }
                });
            }
        });
    }
}




function getUserById(req, res) {
    var id = req.swagger.params.id.value;
    //console.log('req.user._id++++++',req.user._id);
    User.findOne({ _id: req.user._id }, 'firstname lastname email profile_image')
        .lean()
        .exec(function(err, data) {
            if (err) {
                return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
            } else {
                if (data) {
                    if (data.profile_image) {
                        var split = data.profile_image.split('assets/uploads/');
                        utility.fileExistCheck('./public/assets/uploads/' + split[1], function(exist) {
                            if (!exist) {
                                data.profile_image = 'assets/images/default-image.png';
                            }
                            return res.json({ 'code': 200, status: 'success', "message": constantsObj.messages.dataRetrievedSuccess, "data": data });
                        });
                    } else {
                        return res.json({ 'code': 200, status: 'success', "message": constantsObj.messages.dataRetrievedSuccess, "data": data });
                    }
                } else {
                    return res.json(Response(402, "failed", constantsObj.validationMessages.userNotFound, {}));
                }
            }
        });
}


function deleteUserById(req, res) {
    var id = req.body.userId;
    console.log("id", id)
    User.findById(id).exec(function(err, data) {
        if (err) {
            return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
        } else {
            if (!data) {
                return res.json(Response(402, "failed", constantsObj.validationMessages.userNotFound, {}));
            } else {
                data.deleted = true;
                data.save(function(err, userData) {
                    if (err)
                        return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
                    else {
                        return res.json({ 'code': 200, status: 'success', "message": constantsObj.messages.userDeleteSuccess, "data": {} });
                    }
                });
            }
        }
    })
}





function dashboardCount(req, res) {
    // async.parallel({
    //     user: function(callback) {
    //         User.find({deleted: false}).count(function(err, count){
    //             if (err) 
    //                 callback(err);
    //             else 
    //                 callback(null, count);
    //         });
    //     },
    //     institute: function(callback) {
    //         Institute.find({deleted: false}).count(function(err, count){
    //             if (err) 
    //                 callback(err);
    //             else 
    //                 callback(null, count);
    //         });
    //     },
    //     product: function(callback) {
    //         ProductAttribute.find({deleted:false}, { product_id: 1})
    //         .populate({path: 'product_id', select: { updatedAt: 0, createdAt: 0, __v: 0 }, match: {deleted: false}})
    //         // .count()
    //         .exec(function(err, prod) {
    //             var cont = 0;
    //             if (prod.length > 0) {
    //                 for(var i in prod) {
    //                     if (prod[i].product_id) {
    //                         if (prod[i].product_id.deleted == false) {
    //                                   cont++;
    //                         }
    //                     }
    //                 }
    //             }
    //             callback(null, cont);
    //         });
    //     }
    // }, function(err, results) {
    //      if (err) {
    //         return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
    //     } else {
    //         return res.json({ 'code': 200, status: 'success', "message": constantsObj.messages.dataRetrievedSuccess, "data": results});
    //     }
    // });
}



/**
 * Function is use to get all user for email
 * @access private
 * @return json
 * Created by vishal
 * @smartData Enterprises (I) Ltd
 * Created Date 09-fab-2018
 */
function getAllUser(req, res) {
    var query = {
        deleted: false,
        status: 'Active',
        usertype:req.query.type
    };
    if (utility.notEmpty(req.query.firstname)) {
        query.firstname = new RegExp('^' + req.query.firstname, "i");
    }
    if (utility.notEmpty(req.query.lastname)) {
        query.lastname = new RegExp('^' + req.query.lastname, "i");
    }
    if (utility.notEmpty(req.query.email)) {
        query.email = new RegExp('^' + req.query.email, "i");
    }
    var returnData = { total_count: 0, data: [] }
    var page = parseInt(req.query.page) - 1 || 0;
    var limit = parseInt(req.query.limit) || 10;
    var offset = limit * page;
    User.find(query)
        .sort({ createdAt: -1 })
        .exec(function(err, data) {
            if (err) return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
            //returnData.data = data;
            returnData.total_count = data.length;
        
        });
    User.find(query)
        .sort({ createdAt: -1 })
        .skip(offset).limit(limit)
        .exec(function(err, data) {
            if (err) return res.json(Response(500, "failed", constantsObj.validationMessages.internalError, err));
            returnData.data = data;
            //returnData.total_count = data.length;
            return res.json({ code: 200, message: 'Data retrieved successfully.', returnData });
        });
}