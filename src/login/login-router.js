const express = require('express');
const loginService = require('./login-service');
const loginRouter = express.Router();

loginRouter.route('/').post((req, res, next) => {
    const loginInfo = req.body;
    if(!loginInfo){
        res.status(401).send("Something Went Wrong")
    }
    res.status(201).send("ok");
	console.log(loginInfo);
});

module.exports = loginRouter;
