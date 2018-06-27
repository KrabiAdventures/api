const Order = require('../models').Order;

module.exports = {
  create(req, res) {
    return Order
      .create({
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        paid_with: req.body.paid_with,
      })
      .then(order => res.status(201).send(order))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Order
      .all()
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Order
      .findById(req.params.orderId)
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return res.status(200).send(order);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
	return Order
	  .findById(req.params.orderId)
	  .then(order => {
		if (!order) {
		  return res.status(404).send({
			message: 'Order Not Found',
		  });
		}
		return order
		  .update({
			name: req.body.name || order.name,
			email: req.body.email || order.email,
			phone_no: req.body.phone_no || order.phone_no,
			paid_with: req.body.paid_with || order.paid_with,
		  })
		  .then(() => res.status(200).send(order))
		  .catch((error) => res.status(400).send(error));
	  })
	  .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Order
      .findById(req.params.orderId)
      .then(order => {
        if (!order) {
          return res.status(400).send({
            message: 'Order Not Found',
          });
        }
        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
