const express = require('express');
const { logToFile } = require('../functions/logToFile');
const Joi = require('joi');


const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false });

const newUserSchema = Joi.object({
    name: Joi.object({
     first: Joi.string().min(2).max(60).trim().required(),
     last: Joi.string().min(2).max(60).trim().required(),
    }).optional(),
    email: Joi.string().email().lowercase().trim().required(),
    businessUnit: Joi.string().min(2).max(60).trim().required(),
    passwordHash: Joi.string().min(8).max(120).trim(),
    lineManagerId: Joi.string().trim().required(),
    userTagLine: Joi.string().trim(),
    userPhotoKey: Joi.string().trim(),
    isFullUser: Joi.boolean().required().default(false),
    isLineManager: Joi.boolean().required().default(false),
    isSeniorManager: Joi.boolean().required().default(false),
    isAdmin: Joi.boolean().required().default(false)
});

const updateSelfSchema = Joi.object({
   userTagLine: Joi.string().trim(),
});

const updateAdminSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(60).trim().optional(),
    last: Joi.string().min(2).max(60).trim().optional(),
   }).optional(),
   email: Joi.string().email().lowercase().trim().optional(),
   businessUnit: Joi.string().min(2).max(60).trim().optional(),
   lineManagerId: Joi.string().trim().optional(),
   userTagLine: Joi.string().trim(),
   userPhotoKey: Joi.string().trim(),
   isFullUser: Joi.boolean().optional().default(false),
   isLineManager: Joi.boolean().optional().default(false),
   isSeniorManager: Joi.boolean().optional().default(false),
   isAdmin: Joi.boolean().optional().default(false)
});


const validateNewUser = validator(newUserSchema);
const validateUpdateSelf = validator(updateSelfSchema);
const validateUpdateAdmin = validator(updateAdminSchema);

module.exports = {
  validateNewUser,
  validateUpdateSelf,
  validateUpdateAdmin
}


/* holding for authorisation

const updateSelfSchema = Joi.object({
  newPassword: Joi.string().min(8).max(120).pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
})

const updateAdminSchema = Joi.object({
  newPassword: Joi.string().min(8).max(120).pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
})

*/