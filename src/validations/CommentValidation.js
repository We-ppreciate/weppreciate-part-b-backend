const express = require('express');
const Joi = require('joi').extend(require('@joi/date')); 


const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false });

const newCommentSchema = Joi.object({
  nominationId: Joi.string().trim().required(),
  commenterId: Joi.string().trim().required(),
	commentBody: Joi.string().trim().required(),
  commentDate: Joi.date().format('D-MM-YYYY').required(),
});

const updateCommentSchema = Joi.object({
	commentBody: Joi.string().trim().required(),
});

const validateNewComment = validator(newCommentSchema);
const validateUpdateComment = validator(updateCommentSchema);

module.exports = {
  validateNewComment,
  validateUpdateComment
}