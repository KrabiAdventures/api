const Product = require('../models').Product;
const Unavailability = require('../models').Unavailability;

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
      .then(product => res.status(201).send({ id: product.id }))
      .catch(error => res.status(400).send(error));
  },
  
  list(req, res) {
    return Product
      .findAll({
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        },
        include: [{
          model: Unavailability,
          as: 'unavailabilities'
        }]
      })
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Product
      .findOne({ 
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        },
        where: { id: req.params.product_id }, 
        include: [{
          model: Unavailability,
          as: 'unavailabilities'
        }] 
      })
      .then(product => {
        if (!product) 
          return res.status(404).send({
            message: 'Product Not Found',
          });
        
        return res.status(200).send(product);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Product
      .findById(req.params.product_id)
      .then(product => {
        if (!product) 
          return res.status(404).send({
            message: 'Product Not Found',
          });
        
        return product
          .update({
            title: req.body.title || product.title,
            adult_price: req.body.adult_price || product.adult_price,
            child_price: req.body.child_price || product.child_price,
            description: req.body.description || product.excerpt,
            excerpt: req.body.excerpt || product.excerpt,
            itinerary: req.body.itinerary || product.itinerary,
            time: req.body.time || product.time,
            image_url: req.body.image_url || product.image_url,
            published: req.body.published || product.published,
          })
          .then(product => res.status(200).send({ id: product.id })) 
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Product
      .findById(req.params.product_id)
      .then(product => {
        if (!product) 
          return res.status(400).send({
            message: 'Product Not Found',
          });
        
        return product
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};