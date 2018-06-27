const productsController = require('../controllers').products;
const ordersController = require('../controllers').orders;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API.',
  }));

  app.post('/api/products', productsController.create);

  //orders
  app.post('/api/orders', ordersController.create);
};
