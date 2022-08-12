const express = require('express');
const router = express.Router();

//middleware

//controller
const {
    createTag,
    allTags,
    deleteTag,
    editTag,
    updateTag,
    tagCount
} = require('../../controller/dashboard/tag.controller');

router.route('/create').post(createTag);
router.route('/all').get(allTags);
router.route('/delete/:id').delete(deleteTag);
router.route('/edit/:tagSlug').get(editTag);
router.route('/count').get(tagCount);
router.route('/update/:id').put(updateTag);



module.exports = router ; 

