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
};
