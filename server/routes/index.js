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
      router.get('/:product_id', controllers.products.retrieve);
      router.put('/:product_id', controllers.products.update);
      router.delete('/:product_id', controllers.products.destroy);
    });

    router.group('/categories', router => {
      router.post('/', controllers.categories.create);
      router.get('/', controllers.categories.list);
      router.get('/:category_id', controllers.categories.retrieve);
      router.put('/:category_id', controllers.categories.update);
      router.delete('/:category_id', controllers.categories.destroy);
    });
    
    router.group('/orders', router => {
      router.post('/', controllers.orders.create);
      router.get('/', controllers.orders.list);
      router.get('/:OrderId', controllers.orders.retrieve);
      router.put('/:OrderId', controllers.orders.update);
      router.delete('/:OrderId', controllers.orders.destroy);
    });

    router.group('/unavailabilities', router => {
      router.post('/', controllers.unavailabilities.create);
      router.get('/', controllers.unavailabilities.list);
      router.get('/:unavailability_id', controllers.unavailabilities.retrieve);
      router.put('/:unavailability_id', controllers.unavailabilities.update);
      router.delete('/:unavailability_id', controllers.unavailabilities.destroy);
    });
  });
};
