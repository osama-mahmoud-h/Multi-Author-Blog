const express = require('express');
const router = express.Router();

//middleware

//controller
const {
    createCategory,
    allCategories,
    deleteCategory,
    editCategory,
    updateCategory,
    categoryCount
} = require('../../controller/dashboard/category.controller');

router.route('/create').post(createCategory);
router.route('/all').get(allCategories);
router.route('/delete/:id').delete(deleteCategory);
router.route('/edit/:categorySlug').get(editCategory);
router.route('/count').get(categoryCount);
router.route('/update/:id').put(updateCategory);

module.exports = router ; 

