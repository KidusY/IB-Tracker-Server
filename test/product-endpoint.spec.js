const knex = require('knex');
const helper = require('./test-helper');
const app = require('../src/app');

describe('product Endpoints', function() {
	let db;
	let token;
	const { productData } = helper;
	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});
	before('login ', () => {
		 supertest(app).post('/api/login').send({user_name:"admin",password:"admin"}).then(res=>token = res.body.authToken)
			
	});
	after('disconnect from db', () => db.destroy());

	before('cleanup', () => helper.cleanTables(db));

	afterEach('cleanup', () => helper.cleanTables(db));

	describe(`Get /api/product`, () => {
		beforeEach('insert product', () => helper.seedProductsTables(db, productData));

		it.only(`Get a product respondes with 200`, () => {
			return supertest(app)
				.get('/api/product')
				.set(
					'Authorization',
					`bearer ${token}`
				)
				.expect(200, [
					{
						productid:1,
						title: 'Brown eggs',
						type: 'dairy',
						description: 'Raw organic brown eggs in a basketsdfsadf',
						filename: '0.jpg',
						height: '600',
						width: '400',
						price: '28.1',
						rating: '4',
						date_created: '2029-01-22T16:28:32.615Z'
					}
				]);
		});
		it(`Gets nothing  respondes with 200`, () => {
			return supertest(app)
				.get('/api/product')
				.set(
					'Authorization',
					'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTc4ODczMjYsInN1YiI6ImFkbWluIn0.9W2E_SCT9-nXq7O4uQhwhFiEKa8VZF38NuhEXfd_8ic'
				)
				.expect(200, []);
		});
		it(`Gets nothing  respondes with 401`, () => {
			return supertest(app).get('/api/product').expect(401);
		});
	});
});
