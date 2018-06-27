const Product = require('../models').Product;

module.exports = {
  create(req, res) {
    return Product
      .create({
        title: req.body.title,
        adult_price: req.body.adult_price,
        child_price: req.body.child_price,
        description: req.body.description,
        excerpt: req.body.excerpt,
        itinerary: req.body.itinerary,
        time: req.body.time,
        image_url: req.body.image_url,
        published: req.body.published,
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },
};