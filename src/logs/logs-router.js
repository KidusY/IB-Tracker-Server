const express = require('express');
const logsService = require('./logs-services');
const { requireAuth } = require('../middleware/jwt');
const { isAdmin } = require('../middleware/isAdmin');
const logsRouter = express.Router();

logsRouter
	.route('/')
	.all(requireAuth,isAdmin)
	.get((req, res, next) => {
		logsService
			.getAllLogs(req.app.get('db'))
			.then((logs) => {
				res.json(logsService.serializeThings(logs));
			})
			.catch(next);
	})
	.post((req, res, next) => {
		const logs = req.body;

		logsService.addLogs(req.app.get('db'), logs).then((logs) => res.json(logs)).catch((err) => console.log(err));
	});

logsRouter.route('/:logs_id').all(requireAuth).all(checkThingExists).get((req, res) => {
	res.json(logsService.serializeThing(res.logs));
});

/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
	try {
		const logs = await logsService.getByLogsId(req.app.get('db'), req.params.logs_id);

		if (!logs)
			return res.status(404).json({
				error: `logs doesn't exist`
			});

		res.logs = logs;
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = logsRouter;
