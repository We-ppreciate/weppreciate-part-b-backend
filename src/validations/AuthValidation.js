const express = require('express');
const Joi = require('joi').extend(require('@joi/date')); 

const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false });

const passwordResetSchema = Joi.object({
  newPassword: Joi.string().min(8).max(120).pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)

})

const validatePassword = validator(passwordResetSchema);

module.exports = {
  validatePassword
}
