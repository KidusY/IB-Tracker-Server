const express = require('express');
const usersService = require('./users-service');
const usersRouter = express.Router();

usersRouter
	.route('/')
	.get((req, res, next) => {
		usersService.getAllUsers(req.app.get('db'))
			.then((users) => {
				 console.log(users);
				res.json(usersService.serializeThings(users));
			})
			.catch(next);
	})
	.post((req, res, next) => {
    const user = req.body;   
		usersService.addUser(req.app.get('db'), user).then((user) => res.json(user));
  })
  
  

usersRouter.route('/:user_id')
.all(checkThingExists)
.get((req, res) => {
	res.json(usersService.serializeThing(res.user));
})
.put((req, res, next) => {
  const userInfo = req.body;
  usersService.updateUser(req.app.get('db'),res.user.id,userInfo).then(user=>res.send("user info has been updated"))
})
.delete((req, res, next) => {
  usersService.deleteUser(req.app.get('db'),res.user.id).then(product=>res.send("user deleted"))
})

/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
	try {
		const user = await usersService.getByUserId(req.app.get('db'), req.params.user_id);

		if (!user)
			return res.status(404).json({
				error: `User doesn't exist`
			});

		res.user = user;
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = usersRouter;
