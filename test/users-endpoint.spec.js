const knex = require('knex');
const helper = require('./test-helper');
const app = require('../src/app');

describe.only('login Endpoints', function() {
	let db;
	const { users,seedUsersTables } = helper;
	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());

describe.only(`Get /api/users`, () => {	
	beforeEach('insert users', () => seedUsersTables(db, users));
		it(`200`, () => {
			return supertest(app)
                .get('/api/users')
                .send(user)				
				.expect(200);
        });
        

        



	});
});
