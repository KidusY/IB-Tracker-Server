const knex = require('knex');
const helper = require('./test-helper');
const app = require('../src/app');
const loginservices = require('../src/login/login-service');
const supertest = require('supertest');
const loginService = require('../src/login/login-service');

describe('product Endpoints', function() {
	let db;
	let user;
	const { loginUsers } = helper;
	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	before('login', () => {
		loginService.getUserWithUserName(db, loginUsers.user_name).then((dbUser) => (user = dbUser));
	});

	describe('Post /api/login', () => {
		supertest(app).post('/api/login').send(loginUsers).expect({
			authToken: loginservices.createJwt(loginUsers.user_name, { user_id: user.id }),
			payload: { user_id: user.id },
			sub: loginUsers.user_name,
			userImage: user.profilepic,
			isAdmin: user.isadmin
		});
	});
});
