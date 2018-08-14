const OrderProduct = require('../models').OrderProduct;

module.exports = {
  create(req, res) {
    return OrderProduct
      .create({
        orderId: req.body.orderId,
        productId: req.body.productId,
        date: req.body.date,
        adult_quantity: req.body.adult_quantity,
        child_quantity: req.body.child_quantity,
		pickup_location: req.body.pickup_location
      })
      .then(orderProduct => res.status(201).send(orderProduct))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return OrderProduct
      .all()
      .then(orderProduct => res.status(200).send(orderProduct))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return OrderProduct
      .findById(req.params.)
      .then(orderProduct => {
        if (!orderProduct) {
          return res.status(404).send({
            message: 'Product Order Not Found',
          });
        }
        return res.status(200).send(orderProduct);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return OrderProduct
      .findById(req.params.)
      .then(orderProduct => {
        if (!orderProduct) {
          return res.status(404).send({
            message: 'Product Order Not Found',
          });
        }
        return OrderProduct
          .update({
            orderId: req.body.orderId || orderProduct.orderId,
            productId: req.body.productId || orderProduct.productId,
            date: req.body.date || orderProduct.date,
			adult_quantity: req.body.adult_quantity || orderProduct.adult_quantity,
			child_quantity: req.body.child_quantity || orderProduct.child_quantity,
			pickup_location: req.body.pickup_location || orderProduct.pickup_location
          })
          .then(() => res.status(200).send(orderProduct))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return OrderProduct
      .findById(req.params.)
      .then(orderProduct => {
        if (!orderProduct) {
          return res.status(400).send({
            message: 'Product Order Not Found',
          });
        }
        return orderProduct
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
