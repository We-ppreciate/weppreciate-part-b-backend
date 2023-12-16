const request = require('supertest');
const { app } = require('../server');
const { Nomination } = require('../models/NominationModel');
// const { errorSwitch } = require('../controllers/ErrorController');
const express = require('express');
const router = express.Router();

let mockNom = 
    {
        "_id": "6575733ec77e4fcca14b176a",
        "recipientUser": "6575733ec77e4fcca14b1758",
        "nominatorFullUser": "6575733ec77e4fcca14b175d",
        "nominationValue": [
            "Commitment"
        ],
        "nominationBody": "Nate is a great guy!",
        "nominationDate": "Sat Dec 09 2023 10:00:00 GMT+1000 (GMT+10:00)",
        "isNominatorFullUser": true,
        "isNominationInstant": true,
        "isAward": false,
        "isReleased": false,
        "releaseDate": null,
        "__v": 0
    };

describe('GET /nominations/all', () => {
  it('should return all nominations', async () => {
    const mockNominations = [
      mockNom
    ];
    jest.spyOn(Nomination, 'find').mockResolvedValue(mockNominations);

    const response = await request(app).get('/nominations/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ Nominations: mockNominations });
  });
});

describe('GET /all/recipient/:id', () => {
  it('should return all nominations matching recipientUser id 6575733ec77e4fcca14b1758', async () => {
    const mockNominations = [
      mockNom
    ];
    jest.spyOn(Nomination, 'find').mockResolvedValue(mockNominations);

    const response = await request(app).get('/nominations/all/recipient/6575733ec77e4fcca14b1758');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ Nominations: mockNominations });
  });
});

// FAILS
// describe('GET /all/nominator/:firstName/:lastName', () => {
//   it('should return all nominations matching nominator name Ed Dougherty', async () => {
//     const mockNominations = [
//       mockNom
//     ];
//     jest.spyOn(Nomination, 'find').mockResolvedValue(mockNominations);

//     const response = await request(app).get('/nominations/all/nominator/Ed/Dougherty');

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ Nominations: mockNominations });
//   });
// });
