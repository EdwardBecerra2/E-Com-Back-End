const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData)
  }catch(error) {
    res.status(500).json('oops, something went wrong!!')
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = Category.findByPk(req.params.id,{
      include: [{ model: Product}]  
    });
  // be sure to include its associated Products
  res.status(200).json(categoryData)
}catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = Category.create(req.body);
      res.status(200).json(categoryData)
}catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = Category.update(req.body);
     res.status(200).json(categoryData)
} catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

router.delete('/:id',  async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.delete(req.params.id);
  res.status(200).json(categoryData)
}catch(error) {
  res.status(500).json('oops, something went wrong!!')
}
});

module.exports = router;