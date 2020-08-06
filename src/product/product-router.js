const express = require('express');
const productService = require('./product-service');
const {requireAuth} = require('../middleware/jwt');
const productRouter = express.Router();

productRouter
	.route('/')	
	.all(requireAuth)
	.get((req, res, next) => {
		
		productService.getAllProduct(req.app.get('db'))
			.then((product) => {
				res.json(productService.serializeThings(product));
			})
			.catch(next);
	})
	.post((req, res, next) => {
    const product = req.body;   
		productService.addProduct(req.app.get('db'), product).then((product) => res.json(product)).catch(err=>console.log(err));
  })
  
  

productRouter.route('/:product_id')
.all(checkThingExists)
.get((req, res) => {
	res.json(productService.serializeThing(res.product));
})
.put((req, res, next) => {
  const productInfo = req.body;
  productService.updateProduct(req.app.get('db'),res.product.productid,productInfo).then(product=>res.send("product has been updated"))
})
.delete((req, res, next) => {
  productService.deleteProduct(req.app.get('db'),res.product.productid).then(product=>res.send("product deleted"))
})

/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
	try {
		const product = await productService.getByProductId(req.app.get('db'), req.params.product_id);

		if (!product)
			return res.status(404).json({
				error: `Product doesn't exist`
			});

		res.product = product;
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = productRouter;
