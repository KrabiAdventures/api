const controllers = {
  products: require('../controllers').products,
  categories: require('../controllers').categories,
  orders: require('../controllers').orders,
  unavailabilities: require('../controllers').unavailabilities,
};

const requests = {
  products: require('../requests').products,
  categories: require('../requests').categories,
  orders: require('../requests').orders,
  unavailabilities: require('../requests').unavailabilities
};

module.exports = (app) => {
  app.group('/api', router => {
    router.get('/', (req, res) => res.status(200).send({
      message: 'Welcome to the API.',
    }));

    router.group('/products', router => {
      router.post('/', requests.products.validate.create, controllers.products.create);
      router.get('/', controllers.products.list);
      router.get('/:product_id', controllers.products.retrieve);
      router.put('/:product_id', requests.orders.validate.update, controllers.products.update);
      router.delete('/:product_id', controllers.products.destroy);
    });

    router.group('/categories', router => {
      router.post('/', requests.categories.validate.create, controllers.categories.create);
      router.get('/', controllers.categories.list);
      router.get('/:category_id', controllers.categories.retrieve);
      router.put('/:category_id', requests.orders.validate.update, controllers.categories.update);
      router.delete('/:category_id', controllers.categories.destroy);
    });
    
    router.group('/orders', router => {
      router.post('/', requests.orders.validate.create, controllers.orders.create);
      router.get('/', controllers.orders.list);
      router.get('/:order_id', controllers.orders.retrieve);
      router.put('/:order_id', requests.orders.validate.update, controllers.orders.update);
      router.delete('/:order_id', controllers.orders.destroy);
    });

    router.group('/unavailabilities', router => {
      router.post('/', requests.unavailabilities.validate.create, controllers.unavailabilities.create);
      router.get('/', controllers.unavailabilities.list);
      router.get('/:unavailability_id', controllers.unavailabilities.retrieve);
      router.put('/:unavailability_id', requests.unavailabilities.validate.create, controllers.unavailabilities.update);
      router.delete('/:unavailability_id', controllers.unavailabilities.destroy);
    });
  });
};
