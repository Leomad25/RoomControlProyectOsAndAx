const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

router.get('',auth.isNotLoggedIn_en , (req, res) => {
    res.render('pages/en/home', {stylesheet: '/css/pages/home.css'});
});

router.use(require('./panel'));
router.use(require('./add'));
router.use(require('./newaccount'));

module.exports = router;