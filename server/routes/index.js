const controllers = {
  products: require('../controllers').products,
}

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
  });
};