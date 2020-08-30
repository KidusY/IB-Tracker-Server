const knex = require('knex');
const helper = require('./test-helper');
const app = require('../src/app');

describe('logs Endpoints', function() {
	let db;
	let token;
	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});
	before('login ', () => {
		supertest(app)
			.post('/api/login')
			.send({ user_name: 'admin', password: 'admin' })
			.then((res) => (token = res.body.authToken));
	});
	after('disconnect from db', () => db.destroy());

	before('cleanup', () => helper.cleanTables(db));

	afterEach('cleanup', () => helper.cleanTables(db));

	describe(`Get /api/logs`, () => {
		beforeEach('insert product', () => helper.seedProductsTables(db, productData));

		it.only(`Get a logs respondes with 200`, () => {
			return supertest(app).get('/api/logs/1').set('Authorization', `bearer ${token}`).expect(200, [
				{
					logId: 1,
					actions: 'Added Product',
					user_name: 'admin',
					productId: '45',
					price: '151.3',
					quantity: '10',
					date_created: '2020-08-08T03:02:15.972Z'
				}
			]);
		});
	});
});
