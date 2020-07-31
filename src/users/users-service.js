const xss = require('xss');
const bcrypt = require('bcryptjs');
const Treeize = require('treeize');

const UserServices = {
	getAllUsers(db) {
		return db.from('ib_tracker_users').select('*');
	},

	getByUserId(db, id) {
		return UserServices.getAllUsers(db).where('id', id).first();
	},
	hasUserWithUserName(db,user_name){
		return UserServices.getAllUsers(db).where('user_name',user_name).first().then(user=>!!user)
	},

	addUser(db, user) {
		return db
			.insert(user)
			.into('ib_tracker_users')
			.returning('*')
			.then(([ user ]) => user)
			.then((user) => UserServices.getByUserId(db, user.id));
	},

	deleteUser(db, id) {
		return UserServices.getAllUsers(db).where('id', id).del();
	},

	updateUser(db, id, userInfo) {
		return UserServices.getAllUsers(db).where('id', id).update(userInfo);
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
			id: thing.id,
			user_name: xss(thing.user_name),
			full_name: xss(thing.full_name),
			profilepic: xss(thing.profilepic),
			isadmin:thing.isadmin,
			nickname: xss(thing.nickname),
			date_created: thing.date_created,
			date_modified: thing.date_modified
		};
	},
	hashPassword(password) {
		return bcrypt.hash(password, 12);
	}
};

module.exports = UserServices;
