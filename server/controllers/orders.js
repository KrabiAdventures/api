const Order = require('../models').Order;
const OrderProduct = require('../models').OrderProduct;

module.exports = {
  create(req, res) {
    return Order
      .create({
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        paid_with: req.body.paid_with,
        products: req.body.products
      })
      .then(order => {
        new Promise(resolve => {
          req.body.products.forEach(product => {
            OrderProduct.create({ 
              OrderId: order.id,
              productId: product.productId,
              pickup_location: product.pickup_location ? product.pickup_location : 'N/A',
              adult_quantity: product.adult_quantity ? product.adult_quantity : 0,
              child_quantity: product.child_quantity ? product.child_quantity : 0,
              date: product.date ? product.date : null
            });
          });

          resolve();
        }).then(() => {
          res.status(201).send(order);
        });
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Order
      .findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        include: [{
          model: OrderProduct,
          attributes: [
            'productId',
            'date',
            'pickup_location',
            'child_quantity',
            'adult_quantity',
          ] 
        }]
      })
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Order
      .findOne({
        where: { id: req.params.OrderId }, 
        include: [{
          model: OrderProduct,
          attributes: [
            'productId',
            'date',
            'pickup_location',
            'child_quantity',
            'adult_quantity',
          ] 
        }]
      })
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
      .findOne({
        where: { id: req.params.OrderId }, 
        include: [{
          model: OrderProduct,
        }]
      })
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
          .then(order => {
            new Promise(resolve => {
              req.body.products.forEach(product => {
                if (!product.id) 
                  res.status(400).send({ message: 'Each OrderProduct must have an ID. '});

                OrderProduct.findById(product.id)
                  .then(orderProduct => {
                    return orderProduct
                      .update({ 
                        productId: product.productId,
                        pickup_location: product.pickup_location ? product.pickup_location : 'N/A',
                        adult_quantity: product.adult_quantity ? product.adult_quantity : 0,
                        child_quantity: product.child_quantity ? product.child_quantity : 0,
                        date: product.date ? product.date : null
                      });
                  })
                  .catch((error) => res.status(400).send(error));
              });
    
              resolve();
            }).then(() => {
              res.status(201).send(order);
            }).catch((error) => res.status(400).send(error));
          });
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Order
      .findById(req.params.OrderId)
      .then(order => {
        if (!order) {
          return res.status(400).send({
            message: 'Order Not Found',
          });
        }

        OrderProduct.destroy({ where: { OrderId: order.id}});

        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
