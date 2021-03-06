const Category = require('../models').Category;

module.exports = {
  create(req, res) {
    return Category
      .create({
        name: req.body.name,
        description: req.body.description,
        featured: req.body.featured,
      })
      .then(category => res.status(201).send({ id: category.id }))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Category
      .findAll({
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        },
      })
      .then(category => res.status(200).send(category))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Category
      .findOne({ 
        attributes: {
          exclude: [
            'created_at',
            'updated_at'
          ]
        },
        where: { id: req.params.category_id }, 
      })
      .then(category => {
        if (!category) 
          return res.status(404).send({
            message: 'Category Not Found',
          });
        
        return res.status(200).send(category);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Category
      .findById(req.params.category_id)
      .then(category => {
        if (!category) 
          return res.status(404).send({
            message: 'Category Not Found',
          });
        
        return category
          .update({
            name: req.body.name || category.name,
            description: req.body.description || category.description,
            featured: req.body.featured || category.featured,
          })
          .then(category => res.status(200).send({ id: category.id }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Category
      .findById(req.params.category_id)
      .then(category => {
        if (!category) 
          return res.status(400).send({
            message: 'Category Not Found',
          });
        
        return category
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
