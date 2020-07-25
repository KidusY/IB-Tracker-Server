const express = require('express');
const loginService = require('./login-service');
const loginRouter = express.Router();

loginRouter.route('/').post((req, res, next) => {
	const { user_name, password } = req.body;
	const loginUser = { user_name, password };
    
	for (const [ key, value ] of Object.entries(loginUser)) {
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`
			});
	}

	loginService
		.getUserWithUserName(req.app.get('db'), loginUser.user_name)
		.then((dbUser) => {            
			if (!dbUser)
				return res.status(400).json({
					error: 'Incorrect User Name or Password'
				});
			return loginService.comparePasswords(loginUser.password, dbUser.password).then((compareMatch) => {
              
                if (!compareMatch) {
					return res.status(400).json({
						error: 'Incorrect user_name or password'
					});
                }                
				const sub = dbUser.user_name;
                const payload = { user_id: dbUser.id, };               
                
				res.status(201).send({
                    authToken: loginService.createJwt(sub, payload),
                    payload,
                    sub
				});
			});
		})
		.catch(next);


});

module.exports = loginRouter;
