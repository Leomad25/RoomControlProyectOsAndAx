const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/en/authentication/login', passport.authenticate('local.login', {
        successRedirect: '/en/panel',
        failureRedirect: '/en',
        failureFlash: true
}));

router.post('/es/authentication/login', passport.authenticate('local.login', {
    successRedirect: '/es/panel',
    failureRedirect: '/es',
    failureFlash: true
}));

module.exports = router;