const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all Tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: {  
      model: Product
    }
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Find one tag
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include:{  
      model: Product
    }
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update a tag
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with given ID.' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found by given ID.' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;