const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [ 
      {model: Product, attributes: ['id', 'product_name', 'price']}
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
   // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    }, 
    attributes: [ 'category_name', 'id'],
    include: [ 
      {model: Product, attributes: ['id', 'product_name', 'price']}
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id :(!!' });
      return;
    }
    res.json(categoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
   // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(categoryData => res.json(categoryData))
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    { 
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id :(!!' });
        return;
      }
      res.json(categoryData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
Category.destroy({
  where: {
    id: req.params.id
  }
})
.then(categoryData => {
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with this id :(!!' });
    return;
  }
  res.json(categoryData);
})
.catch(error => {
  console.log(error);
  res.status(500).json(error);
});

});

module.exports = router;