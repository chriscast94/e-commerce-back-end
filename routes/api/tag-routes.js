const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = Tag.findAll(({ include: [Product] }));
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = Tag.findByPk(req.params.id, {
      include: [Product],
    });

    if (!singleTag) {
      res.status(404).json({ message: "No tag with this id!" });
      return
    }

    res.status(200).json(singleTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTag = Tag.update(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTagData = Traveller.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedTagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(deletedTagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

//Received hint/help from miniproject traveller code (directed from homework instructions)
