const knex = require('knex');
const helper = require('./test-helper');
const app = require('../src/app');

describe('product Endpoints', function() {
	let db;
	const { inventory, seedInventoryTables } = helper;
	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());

	before('cleanup', () => helper.cleanTables(db));

	afterEach('cleanup', () => helper.cleanTables(db));

	describe(`Get /api/inventory`, () => {
		beforeEach('insert inventory', () => seedInventoryTables(db, inventory));

		it(`Get a product respondes with 200`, () => {
			return supertest(app)
				.get('/api/inventory')
				.set(
					'Authorization',
					'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTc4ODczMjYsInN1YiI6ImFkbWluIn0.9W2E_SCT9-nXq7O4uQhwhFiEKa8VZF38NuhEXfd_8ic'
				)
				.expect(200, [
					{
						productid: 45,
						title: 'Strawberries',
						location: 'a/2/1',
						quantity: 10,
						userid: 2,
						user_name: 'admin',
						comments: 'low product'
					}
				]);
		});
		it(`Gets nothing  respondes with 200`, () => {
			return supertest(app)
				.get('/api/inventory')
				.set(
					'Authorization',
					'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTc4ODczMjYsInN1YiI6ImFkbWluIn0.9W2E_SCT9-nXq7O4uQhwhFiEKa8VZF38NuhEXfd_8ic'
				)
				.expect(200, []);
		});
		it(`Gets unauthorized respondes with 401`, () => {
			return supertest(app).get('/api/inventory').expect(401);
		});
	});
});
