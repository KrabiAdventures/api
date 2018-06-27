const Unavailability = require('../models').Unavailability;

module.exports = {
  create(req, res) {
    return Unavailability
      .create({
        title: req.body.title,
        description: req.body.description,
        dateTo: req.body.dateTo,
        dateFrom: req.body.dateFrom,
        productId: req.body.productId
      })
      .then(unavailability => res.status(201).send(unavailability))
      .catch(error => res.status(400).send(error));
  },
  
  list(req, res) {
    return Unavailability
      .all()
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Unavailability
      .findById(req.params.unavailabilityId)
      .then(unavailability => {
        if (!unavailability) {
          return res.status(404).send({
            message: 'Unavailability Not Found',
          });
        }
        return res.status(200).send(unavailability);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Unavailability
      .findById(req.params.unavailabilityId)
      .then(unavailability => {
        if (!unavailability) {
          return res.status(404).send({
            message: 'Unavailability Not Found',
          });
        }
        return unavailability
          .update({
            title: req.body.title || unavailability.title,
            dateTo: req.body.dateTo || unavailability.dateTo,
            dateFrom: req.body.dateFrom || unavailability.dateFrom
          })
          .then(() => res.status(200).send(unavailability)) 
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Unavailability
      .findById(req.params.unavailabilityId)
      .then(unavailability => {
        if (!unavailability) {
          return res.status(400).send({
            message: 'Unavailability Not Found',
          });
        }
        return unavailability
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};