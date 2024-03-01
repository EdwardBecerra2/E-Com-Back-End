const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const tagData = Tag.findAll();
    res.status(200).json(tagData)
  }catch(error) {
    res.status(500).json('oops, something went wrong!!')
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const tagData = Tag.findByPk(req.params.id);
  // be sure to include its associated Products
  res.status(200).json(tagData)
}catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const tagData = Tag.create(req.body);
      res.status(200).json(tagData)
}catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const tagData = Tag.update(req.body);
     res.status(200).json(tagData)
} catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const tagData = Tag.delete(req.params.id);
  res.status(200).json(tagData)
}catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

module.exports = router;