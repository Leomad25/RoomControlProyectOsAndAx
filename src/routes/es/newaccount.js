const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

router.get('/newaccount', auth.isNotLoggedIn_en, (req, res) => {
    res.render('pages/es/newaccount', {stylesheet: '/css/pages/newaccount.css'});
});

module.exports = router;