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
        req.body.products.forEach(product => {
          OrderProduct.create({ 
            order_id: order.id,
            product_id: product.product_id,
            pickup_location: product.pickup_location ? product.pickup_location : 'N/A',
            adult_quantity: product.adult_quantity ? product.adult_quantity : 0,
            child_quantity: product.child_quantity ? product.child_quantity : 0,
            date: product.date ? product.date : null
          });
        });
        
        res.status(201).send(order);
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Order
      .findAll({
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        },
        include: [{
          model: OrderProduct,
          as: 'order_products',
          attributes: [
            'product_id',
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
        where: { id: req.params.order_id }, 
        include: [{
          model: OrderProduct,
          as: 'order_products',
          attributes: [
            'id',
            'product_id',
            'date',
            'pickup_location',
            'child_quantity',
            'adult_quantity',
          ] 
        }]
      })
      .then(order => {
        if (!order) 
          return res.status(404).send({
            message: 'Order Not Found',
          });
        
        return res.status(200).send(order);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Order
      .findOne({
        where: { id: req.params.order_id }, 
        include: [{
          model: OrderProduct,
          as: 'order_products'
        }]
      })
      .then(order => {
        if (!order)
          return res.status(404).send({
            message: 'Order Not Found',
          });
        
        return order
          .update({
            name: req.body.name || order.name,
            email: req.body.email || order.email,
            phone_no: req.body.phone_no || order.phone_no,
            paid_with: req.body.paid_with || order.paid_with,
          })
          .then(order => {
            req.body.products.forEach(product => {
              if (!product.id) 
                res.status(400).send({ message: 'Each OrderProduct must have an ID. '});

              OrderProduct.findById(product.id)
                .then(orderProduct => {
                  return orderProduct
                    .update({ 
                      product_id: product.product_id || orderProduct.product_id,
                      pickup_location: product.pickup_location || orderProduct.pickup_location,
                      adult_quantity: product.adult_quantity || orderProduct.adult_quantity,
                      child_quantity: product.child_quantity || orderProduct.child_quantity,
                      date: product.date || orderProduct.date
                    });
                })
                .catch((error) => res.status(400).send(error));
            });
    
            res.status(201).send(order);
          });
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Order
      .findById(req.params.order_id)
      .then(order => {
        if (!order)
          return res.status(400).send({
            message: 'Order Not Found',
          });

        OrderProduct.destroy({ 
          where: { order_id: order.id }
        });

        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
