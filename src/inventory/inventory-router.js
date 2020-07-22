const express = require('express');
const inventoryService = require('./inventory-service');
const inventoryRouter = express.Router();

inventoryRouter
	.route('/')
	.get((req, res, next) => {
		inventoryService
			.getAllInventory(req.app.get('db'))
			.then((inventory) => {
				res.json(inventoryService.serializeThings(inventory));
			})
			.catch(next);
	})
	.post((req, res, next) => {
		const newinventory = req.body;
		inventoryService
			.getInventoryByProductId(req.app.get('db'), newinventory.productid)
			.then((inventory) => {
				//if inventory already exists then update the existing one
				if (inventory) {
					if (inventory.productid == newinventory.productid) {
						inventory.quantity = Number(inventory.quantity) + Number(newinventory.quantity);

						inventoryService
							.updateInventoryByProductId(req.app.get('db'), inventory.productid, inventory)
							.then((inventory) => res.json('Updated'))
							.catch((err) => console.log(err));
					}
				} else {
					//create a new inventory if the inventory does not exists
					inventoryService
						.addInventory(req.app.get('db'), newinventory)
						.then((inventory) => res.json(inventory))
						.catch((err) => console.log(err));
				}
			})
			.catch(next);
	});

inventoryRouter
	.route('/:inventory_id')
	.all(checkThingExists)
	.get((req, res) => {
		res.json(inventoryService.serializeThing(res.inventory));
	})
	.put((req, res, next) => {
		const inventoryInfo = req.body;
		inventoryService
			.updateInventory(req.app.get('db'), res.inventory.inventoryid, inventoryInfo)
			.then((inventory) => res.send('Inventory has been updated'));
	})
	.delete((req, res, next) => {
		const { quantity } = req.body;
		const inventoryInfo = res.inventory;

		if (inventoryInfo.quantity === 0 || inventoryInfo.quantity <= quantity) {
			inventoryService
				.deleteInventory(req.app.get('db'), res.inventory.inventoryid)
				.then(() => res.json('Deleted'));
		} else {
			const newQuantity = { quantity: Number(inventoryInfo.quantity) - Number(quantity) };

			inventoryService
				.updateInventory(req.app.get('db'), res.inventory.inventoryid,  newQuantity )
				.then(() => res.json('Deleted'));
		}
	});

/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
	try {
		const inventory = await inventoryService.getByInventoryId(req.app.get('db'), req.params.inventory_id);

		if (!inventory)
			return res.status(404).json({
				error: `Inventory doesn't exist`
			});

		res.inventory = inventory;
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = inventoryRouter;
