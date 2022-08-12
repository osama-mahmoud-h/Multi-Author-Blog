const express = require('express');
const router = express.Router();

//middleware

//controller
const {

    usersCount,
    visitorsCount
} = require('../../controller/dashboard/users.controller');

router.route('/count').get(usersCount);
router.route('/visitor/count').get(visitorsCount);



module.exports = router ; 

