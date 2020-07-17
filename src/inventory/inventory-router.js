const express = require('express');
const inventoryService = require('./inventory-service');
const inventoryRouter = express.Router();

inventoryRouter
	.route('/')
	.get((req, res, next) => {
		inventoryService.getAllInventory(req.app.get('db'))
			.then((inventory) => {
				res.json(inventoryService.serializeThings(inventory));
			})
			.catch(next);
	})
	.post((req, res, next) => {
    const inventory = req.body;   
		inventoryService.addInventory(req.app.get('db'), inventory).then((inventory) => res.json(inventory));
  })
  
  

inventoryRouter.route('/:inventory_id')
.all(checkThingExists)
.get((req, res) => {
	res.json(inventoryService.serializeThing(res.inventory));
})
.put((req, res, next) => {
  const inventoryInfo = req.body;
  inventoryService.updateInventory(req.app.get('db'),res.inventory.inventoryid,inventoryInfo).then(inventory=>res.send("Inventory has been updated"))
})
.delete((req, res, next) => {
  inventoryService.deleteInventory(req.app.get('db'),res.inventory.inventoryid).then(inventory=>res.send("Inventory deleted"))
})

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
