const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

router.get('/en/logout', auth.isLoggedIn_en, (req, res) => {
    req.logOut();
    res.redirect('/en');
});

router.get('/es/logout', auth.isLoggedIn_es, (req, res) => {
    req.logOut();
    res.redirect('/es');
});

module.exports = router;