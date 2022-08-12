const express = require('express');
const router = express.Router();


//controllers
const { 
    get_details_of_article,
    get_likes_of_article,
    like_article,
    dislike_article,
    user_comment,
    all_article_comments,
    delete_comment

} = require('../../controller/home/articleDetails.controller');

const {
    get_all_home_article, 
    get_home_tag_category,
    get_recent_old_articles,
    get_articles_of_category,
    get_articles_of_tag,
    get_popular_articles,
    addVisitor
 } = require('../../controller/home/home.controller');

router.route('/article/details/:articleId').get(get_details_of_article);
router.route('/article/get-like').post(get_likes_of_article);

//like-dislike
router.route('/article/user-like').post(like_article);
router.route('/article/user-dislike').post(dislike_article);

//user comments
router.route('/article/user-comment').post(user_comment);
router.route('/article/comments/:articleId').get(all_article_comments);
router.route('/article/user-comment/delete/:commentId').delete(delete_comment);

//visitors
router.route('/visitor/add').post(addVisitor);



router.route('/article/popular').get(get_popular_articles);
router.route('/article/all').get(get_all_home_article);
router.route('/article/old-recent').get(get_recent_old_articles);
router.route('/article/category').get(get_articles_of_category);
router.route('/article/tag').get(get_articles_of_tag);

router.route('/tag-category/all').get(get_home_tag_category);
//router.route('/article').get();



module.exports = router ; 

