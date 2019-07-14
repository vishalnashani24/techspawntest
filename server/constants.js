//Constant variables are declared here.
const config = {
    "cryptoAlgorithm": "aes-256-ctr",
    "cryptoPassword": 'd6F3Efeq',
    "secret": "adtrack"
}
const messages = {
    "loginSuccess": "Logged in successfully.",
    "signupSuccess": "Signup successfully",
    "userCreateByAdmin": "User created successfully",
    "dataRetrievedSuccess": "Data retrieved successfully.",
    "errorRetreivingData": "Error in retrieving data.",
    "noDataFound": "No Data Found.",
    "logoutSuccess": "Successfully logout.",
    "successInChangePassword": "Password changed successfully.",
    "forgotPasswordSuccess": "Your password has been sent to the email you used to sign up.",
    "userDeleteSuccess": "User deleted successfully.",
    "propertyDeleteSuccess": "Property deleted successfully.",
    "userAddedSuccess": "User added successfully.",
    "userUpdatedSuccess": "User updated successfully.",
    "propertyUpdatedSuccess": "Property updated successfully.",
    "authenticationFailed": "Authentication failed!",
    "logoutSuccess": "Logout successfully.",
}
const validationMessages = {
    "emailAlreadyExist": "Email ID already exists, please try again with another.",
    "propertyAlreadyAssign": "Property already Assigned",
    "titleAlreadyExist": "Title already exist, try with another.",
    "usernameAlreadyExist": "Username already exist, try with another.",
    "emailRequired": "Email is required.",
    "firstnameRequired": "First name is required.",
    "passwordRequired": "Password is required.",
    "deviceTypeRequired": "Device type is required.",
    "deviceIdRequired": "Device id is required.",
    "deviceTokenRequired": "Device token is required.",
    "invalidEmail": "Invalid Email Given.",
    "invalidEmailOrPassword": "Invalid email or password.",
    "internalError": "Internal error.",
    "requiredFieldsMissing": "Required fields missing.",
    "emailNotExist": "Email doesn't exist.",
    "userNotFound": "User not found.",
    "passwordNotMatch": "New password cannot not be the same as the old password.",
    "invalidDeviceType": "Invalid device type, It should be Android or iOS.",
    "noRecordFound": "No record found.",
    "pageNotFound": "Page not found.",
    "dataNotFound": "No record found.",
}

const emailSubjects = {
    "verify_email": "Welcome to Adtrack - Verify your email address ",
    "facebookLogin": "Welcome to Adtrack",
    "forgotPassword": "Adtrack - Forgot password"
}
var obj = {
    config: config,
    messages: messages,
    validationMessages: validationMessages,
    emailSubjects: emailSubjects
};
module.exports = obj;