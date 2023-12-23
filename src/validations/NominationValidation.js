const express = require('express');
const { logToFile } = require('../functions/logToFile');
const Joi = require('joi').extend(require('@joi/date')); 


const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false });

const newNominationSchema = Joi.object({
  recipientUser: Joi.string().trim().required(),
  nominatorFullUser: Joi.string().trim(),
  nominatorBasicUser: Joi.object({
    basicName: Joi.object({
      first: Joi.string().trim().optional(),
      last: Joi.string().trim().optional(),
    }).optional(),
    basicEmail: Joi.string().email().lowercase().trim().optional(),
  }).optional(),
  nominationValue: Joi.string().trim().required(),
  nominationBody: Joi.string().trim().required(),
  nominationDate: Joi.date().format('D-MM-YYYY').required(),
  isNominatorFullUser: Joi.boolean().required().default(false),
  isNominationInstant: Joi.boolean().required().default(false),
  isAward: Joi.boolean().required().default(false),
  isReleased: Joi.boolean().required().default(false),
  releaseDate: Joi.string().pattern(new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$')).allow(null, ''),
});

const updateNominationSchema = Joi.object({
  nominationId: Joi.string().trim().optional(),
  isAward: Joi.boolean().optional().default(false),
  isReleased: Joi.boolean().optional().default(false),
  releaseDate: Joi.string().pattern(new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$')).allow(null, '').optional(),
});

const validateNewNomination = validator(newNominationSchema);
const validateUpdateNomination = validator(updateNominationSchema);

module.exports = {
  validateNewNomination,
  validateUpdateNomination
}
