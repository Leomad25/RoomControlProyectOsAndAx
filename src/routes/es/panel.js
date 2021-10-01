const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

const pool = require('./../../database');

router.get('/panel', auth.isLoggedIn_en, async (req, res) => {
    const devices = await pool.query('SELECT iddevice FROM swich_controler_db.`users-devices` WHERE iduser = ?;', [req.user.iduser]);
    if (devices) {
        devices.forEach(async element => {
            const nameDeviceTable = await pool.query('SELECT namedevice FROM swich_controler_db.devices WHERE iddevice=?;', [element.iddevice]);
            element.namedevice = nameDeviceTable[0].namedevice;
        });
    }
    if (req.query.message) {
        message = req.query.message;
        res.render('pages/es/panel', {stylesheet: '/css/pages/panel.css', devices, message});
    } else {
        res.render('pages/es/panel', {stylesheet: '/css/pages/panel.css', devices});
    }
});

router.use(require('./add'));
router.use(require('./control'));
router.use(require('./delete'));

module.exports = router;