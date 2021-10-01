const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/en/authentication/register', passport.authenticate('local.register', {
    successRedirect: '/en/panel',
    failureRedirect: '/en/',
    failureFlash: true
}));

router.post('/es/authentication/register', passport.authenticate('local.register', {
    successRedirect: '/es/panel',
    failureRedirect: '/es/',
    failureFlash: true
}));

module.exports = router;