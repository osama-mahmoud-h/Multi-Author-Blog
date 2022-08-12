const express = require('express');
const router = express.Router();

//validator 
const{
articleValidator
} = require("../../requestValidator/dashboard/article.validator");

//middleware

//controller
const {
    createArticle,
    allArticles,
    deleteArticle,
    editArticle,
    articleCount,
    updateArticle
} = require('../../controller/dashboard/article.controller');

router.route('/create').post(articleValidator,createArticle);

router.route('/all').get(allArticles);

router.route('/delete/:id').delete(deleteArticle);
router.route('/edit/:articleId').get(editArticle);
router.route('/count').get(articleCount);
router.route('/update/:id').put(articleValidator,updateArticle);


module.exports = router ; 

