const express = require('express');
const { Login ,Signup , userLogout} = require('../Controllers/Auth.js');
const { authMiddleware } = require('../Middleware/authMiddleware.js');
const AuthRouter = express.Router();



AuthRouter.post('/login', Login)
// .post('/login', postLogin)

AuthRouter.post('/signup', Signup);
AuthRouter.post("/logout", authMiddleware(), userLogout);

module.exports = { AuthRouter }

