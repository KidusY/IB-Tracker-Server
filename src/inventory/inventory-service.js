const xss = require('xss');
const Treeize = require('treeize');

const inventoryService = {
	getAllInventory(db) {
		return db.from('inventory').select('*');
	},

	getByInventoryId(db, id) {
		return inventoryService.getAllInventory(db).where('inventoryid', id).first();
	},

	addInventory(db, inventory) {
		return db
			.insert(inventory)
			.into('inventory')
			.returning('*')
			.then(([ inventory ]) => inventory)
			.then((inventory) => inventoryService.getByInventoryId(db, inventory.inventoryid));
	},

	deleteInventory(db, inventoryId) {		
		return inventoryService.getAllInventory(db).where('inventoryid', inventoryId).del();
	},

	updateInventory(db,inventoryId,inventoryInfo){
		return inventoryService.getAllInventory(db).where('inventoryid', inventoryId).update(inventoryInfo)
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
			inventoryid :thingData.inventoryid,
			productid: thingData.productid,		
			location: thingData.location,
			quantity:thingData.quantity,
			userId:thingData.userId,
			comments:thingData.comments,
			date_created: thingData.date_created,
			date_modified:thingData.date_modified
		};
	}
};

module.exports = inventoryService;
