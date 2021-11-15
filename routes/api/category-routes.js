const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = Tag.findAll(({ include: [Product] }));
    res.status(200).json(allCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!singleCategory) {
      res.status(404).json({ message: "No category with this id!" });
      return
    }

    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = Tag.update(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategoryData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(deletedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

//Received hint/help from miniproject traveller code (directed from homework instructions)
//Copied from my tag-routes and adjusted for category
