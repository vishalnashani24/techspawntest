'use strict';

var mongoose = require('mongoose'),
    constantsObj = require('./../../constants');

var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    firstname: { type: String, required: [true, 'First name is required'] },
    lastname: { type: String, required: [true, 'Last name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, require: true },
    profile_image: { type: String, default: '' },
    salary:{type:String},
    age:{type:Number},
    usertype:{type:String},
    deviceInfo: [{
        deviceType: { type: String },
        deviceId: { type: String },
        deviceToken: { type: String },
        access_token: { type: String },
    }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

     

UserSchema.statics.existCheck = function(email, id, callback) {
    var where = {};
    if (id) {
        where = {
            $or: [{ email: new RegExp('^' + email + '$', "i") }],
            deleted: { $ne: true },
            _id: { $ne: id }
        };
    } else {
        where = { $or: [{ email: new RegExp('^' + email + '$', "i") }], deleted: { $ne: true } };
    }
    User.findOne(where, function(err, userdata) {
        if (err) {
            callback(err)
        } else {
            if (userdata) {
                callback(null, constantsObj.validationMessages.emailAlreadyExist);
            } else {
                callback(null, true);
            }
        }
    });
};
var User = mongoose.model('User', UserSchema);
module.exports = User;
User.find({}).exec(function(err, data) {
    if (data.length == 0) {
        User({firstname : 'admin', lastname: 'admin',usertype:'admin', email : 'admin@gmail.com', password : '55dc87c47427'}).save(function(err, adminData){
        });
    }
});