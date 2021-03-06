const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase');
const app = express();
const {getAllRequests,createNewRequest} = require('./handlers/requests');
const {getAllCompanies} = require('./handlers/companies');
const {signup,login,getAuthenticatedUser} = require('./handlers/users');
const authMiddleware = require('./util/authMiddleware');


//Requests route
app.get('/requests',getAllRequests);
app.post('/requests',authMiddleware,createNewRequest);

//User routes
app.post('/signup',signup);
app.post('/login',login);
app.get('/user',authMiddleware,getAuthenticatedUser);

//get companies
app.get('/companies',getAllCompanies)

exports.api = functions.https.onRequest(app);