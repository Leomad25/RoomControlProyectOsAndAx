const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

const pool = require('./../../database');

router.get('/panel/delete', auth.isLoggedIn_en, async (req, res) => {
    const check = await pool.query('SELECT iduserdevice FROM swich_controler_db.`users-devices` WHERE iduser=? AND iddevice=?;', [req.user.iduser, req.query.iddevice]);
    if (check.length > 0) {
        await pool.query('DELETE FROM `swich_controler_db`.`devices` WHERE (`iddevice` = ?);', [req.query.iddevice]);
        res.redirect('/en/panel');
    } else {
        const message = 'You+do+not+have+access+to+this+device.';
        res.redirect('/en/panel?message=' + message);
    }
});

module.exports = router;