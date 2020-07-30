const xss = require('xss');
const Treeize = require('treeize');

const logsServices = {
	getAllLogs(db) {
		return db.from('logs').select('*');
	},

	getByLogsId(db, id) {
		console.log('id', id);
		return logsServices.getAllLogs(db).where('logid', id).first();
	},

	addLogs(db, Logs) {
		return db
			.insert(Logs)
			.into('logs')
			.returning('*')
			.then(([ logs ]) => {
				return logs;
			})
			.then((logs) => {
				return logsServices.getByLogsId(db, logs.logid);
			});
	},

	

	serializeThings(things) {
		return things.map(this.serializeThing);
	},

	serializeThing(thing) {
		const thingTree = new Treeize();

		// Some light hackiness to allow for the fact that `treeize`
		// only accepts arrays of objects, and we want to use a single
		// object.
		const thingData = thingTree.grow([ thing ]).getData()[0];

		return {
			logId: thing.logid,
			actions: xss(thing.actions),
			user_name: xss(thing.user_name),
			productId: thing.productid,
			quantity: thing.quantity,
			date_created: thing.date_created
		};
	}
};

module.exports = logsServices;
