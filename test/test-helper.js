function seedProductsTables(db, product) {
	return db.into('product').insert(product);
}
function seedUsersTables(db, users) {
	return db.into('ib_tracker_users ').insert(users);
}
function seedInventoryTables(db, users) {
	return db.into('ib_tracker_users ').insert(users);
}

const productData = [
	{
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
];

const users = [
	{
		user_name: 'kidusY12333344',
		full_name: 'Admin',
		profilepic: '',
		isadmin: true,
		nickname: 'Kid'
	}
];
const inventory = [
	{
		productid: 45,
		title: 'Strawberries',
		location: 'a/2/1',
		quantity: 10,
		userid: 2,
		user_name: 'admin',
		comments: 'low product'
	}
];

function cleanTables(db) {
	return db.raw(
		`TRUNCATE
        product cascade
        inventory
        ib_tracker_users        
        `
	);
}
module.exports = {
	seedProductsTables,
    seedUsersTables,
    seedInventoryTables,
	productData,
    cleanTables,
    inventory,
	users
};
