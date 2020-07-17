const xss = require('xss');
const Treeize = require('treeize');

const ProductService = {
	getAllProduct(db) {
		return db.from('product').select('*');
	},

	getByProductId(db, id) {
		return ProductService.getAllProduct(db).where('productid', id).first();
	},

	addProduct(db, product) {
		return db
			.insert(product)
			.into('product')
			.returning('*')
			.then(([ product ]) => product)
			.then((product) => ProductService.getByProductId(db, product.productid));
	},

	deleteProduct(db, productId) {		
		return ProductService.getAllProduct(db).where('productid', productId).del();
	},

	updateProduct(db,productId,productInfo){
		return ProductService.getAllProduct(db).where('productid', productId).update(productInfo)
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
			productid: thingData.productid,
			title: xss(thingData.title),
			description: xss(thingData.description),
			type: xss(thingData.type),
			filename: xss(thingData.filename),
			height: thingData.height,
			width: thingData.width,
			price: thingData.price,
			rating: thingData.rating,
			location: thingData.location,
			upc: thingData.upc,
			date_created: thingData.date_created
		};
	}
};

module.exports = ProductService;
