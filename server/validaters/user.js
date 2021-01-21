const Joi = require('joi');

let commonSchema = {
    email:Joi.string().required().label('Email Address Or Username'),
    password:Joi.string().min(4).max(24).required().label('Password')
}

const UserRegisterSchema = Joi.object({
    username:Joi.string().min(5).label('User Name'),
    ...commonSchema
})

const UserUpdateSchema = Joi.object({
    username:Joi.string().min(5).label('User Name'),
    id:Joi.number().required(),
    ...commonSchema
})

const UserLoginSchema = Joi.object({
    ...commonSchema
})

module.exports = {
    UserLoginSchema,
    UserRegisterSchema,
    UserUpdateSchema
}