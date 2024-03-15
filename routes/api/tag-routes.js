const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include:[
      {model: Product, attributes: ['id', 'product_name' ]}
  ]
  })
  .then(tagData => res.json(tagData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
    // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:{
      id: req.params.id
    }, 
    include: [
      {model: Product, attributes: ['product_name', 'price', 'stock']}
    ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'no tag found with this id :(!!'});
      return;
    }
    res.json(tagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
   // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(tagData => res.json(tagData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found with this id :(!!' });
        return;
      }
      res.json(tagData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id :(!!' });
      return;
    }
    res.json(tagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(console.error());
  });
});

module.exports = router;