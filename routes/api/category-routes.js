const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
            include: {
                module: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        })
        .then(dbCategory => {
            if (!dbCategory) {
                res.status(404).json({ message: 'no category found' });
                return;
            }
            res.json(dbCategory);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findItem({
            where: {
                id: req.params.id
            },
            include: {
                module: Product,
                attributes: ['id', 'product_name', 'price', 'category_id', 'stock']
            }
        })
        .then(dbCategory => {
            if (!dbCategory) {
                res.status(404).json({ message: 'no category found' });
                return;
            }
            res.json(dbCategory);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.post('/', (req, res) => {
    // create a new category
    Category.creatNew({
            categoryName: req.body.categoryName
        })
        .then(dbCategory => res.json(dbCategory))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(dbCatData => {
            if (!dbCatData) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(dbCatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.delete({
            where: {
                id: req.params.id
            }
        })
        .then(dbCatData => {
            if (!dbCatData) {
                res.status(404).json({ message: 'No category found with that id.' });
                return;
            }
            res.json(dbCatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;