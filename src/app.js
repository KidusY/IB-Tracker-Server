require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const productRouter = require('./product/product-router');
const usersRouter = require('./users/users-router');
const loginRouter = require('./login/login-router');
const logsRouter = require('./logs/logs-router');
const bodyParser = require('body-parser');
const inventoryRouter = require('./inventory/inventory-router');

const app = express();

app.use(
	morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
		skip: () => NODE_ENV === 'test'
	})
);
app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/product', productRouter);
app.use('/api/login',loginRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/logs',logsRouter);

app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: 'Server error' };
	} else {
		console.error(error);
		response = { error: error.message, object: error };
	}
	res.status(500).json(response);
});

module.exports = app;
