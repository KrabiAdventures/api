const controllers = {
  products: require('../controllers').products,
  categories: require('../controllers').categories,
  orders: require('../controllers').orders,
  unavailabilities: require('../controllers').unavailabilities,
};

module.exports = (app) => {
  app.group('/api', router => {
    router.get('/', (req, res) => res.status(200).send({
      message: 'Welcome to the API.',
    }));

    router.group('/products', router => {
      router.post('/', controllers.products.create);
      router.get('/', controllers.products.list);
      router.get('/:productId', controllers.products.retrieve);
      router.put('/:productId', controllers.products.update);
      router.delete('/:productId', controllers.products.destroy);
    });

    router.group('/categories', router => {
      router.post('/', controllers.categories.create);
      router.get('/', controllers.categories.list);
      router.get('/:categoryId', controllers.categories.retrieve);
      router.put('/:categoryId', controllers.categories.update);
      router.delete('/:categoryId', controllers.categories.destroy);
    });
    
    router.group('/orders', router => {
      router.post('/', controllers.orders.create);
      router.get('/', controllers.orders.list);
      router.get('/:orderId', controllers.orders.retrieve);
      router.put('/:orderId', controllers.orders.update);
      router.delete('/:orderId', controllers.orders.destroy);
    });

    router.group('/unavailabilities', router => {
      router.post('/', controllers.unavailabilities.create);
      router.get('/', controllers.unavailabilities.list);
      router.get('/:unavailabilityId', controllers.unavailabilities.retrieve);
      router.put('/:unavailabilityId', controllers.unavailabilities.update);
      router.delete('/:unavailabilityId', controllers.unavailabilities.destroy);
    });
  });
};
