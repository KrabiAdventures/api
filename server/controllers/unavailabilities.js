const Unavailability = require('../models').Unavailability;

module.exports = {
  create(req, res) {
    return Unavailability
      .create({
        description: req.body.description,
        date_to: req.body.date_to,
        date_from: req.body.date_from,
        product_id: req.body.product_id
      })
      .then(unavailability => res.status(201).send(unavailability))
      .catch(error => res.status(400).send(error));
  },
  
  list(req, res) {
    return Unavailability
      .findAll({
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        }
      })
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Unavailability
      .findOne({ 
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        },
        where: { id: req.params.unavailability_id }, 
      })
      .then(unavailability => {
        if (!unavailability) 
          return res.status(404).send({
            message: 'Unavailability Not Found',
          });
        
        return res.status(200).send(unavailability);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Unavailability
      .findById(req.params.unavailability_id)
      .then(unavailability => {
        if (!unavailability) 
          return res.status(404).send({
            message: 'Unavailability Not Found',
          });
        
        return unavailability
          .update({
            description: req.body.description || unavailability.description,
            date_to: req.body.date_to || unavailability.date_to,
            date_from: req.body.date_from || unavailability.date_from,
            product_id: req.body.product_id
          })
          .then(() => res.status(200).send(unavailability)) 
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Unavailability
      .findById(req.params.unavailability_id)
      .then(unavailability => {
        if (!unavailability)
          return res.status(400).send({
            message: 'Unavailability Not Found',
          });
        
        return unavailability
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};