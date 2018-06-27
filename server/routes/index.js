const controllers = {
  products: require('../controllers').products,
  orders: require('../controllers').orders,
}

module.exports = (app) => {
  app.group('/api', router => {
    router.get('/', (req, res) => res.status(200).send({
      message: 'Welcome to the API.',
    }));

	router.group('/orders', router => {
	  router.post('/', controllers.orders.create);
	  router.get('/', controllers.orders.list);
	  router.get('/:orderId', controllers.orders.retrieve);
	  router.put('/:orderId', controllers.orders.update);
	  router.delete('/:orderId', controllers.orders.destroy);
	});

    router.group('/products', router => {
      router.post('/', controllers.products.create);
      router.get('/', controllers.products.list);
      router.get('/:productId', controllers.products.retrieve);
      router.put('/:productId', controllers.products.update);
      router.delete('/:productId', controllers.products.destroy);
    });
  });
};
