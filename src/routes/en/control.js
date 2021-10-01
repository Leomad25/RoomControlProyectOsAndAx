const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

const pool = require('../../database');
const { query } = require('../../database');

router.get('/panel/control', auth.isLoggedIn_en, async (req, res) => {
    const check = await pool.query('SELECT iduserdevice FROM swich_controler_db.`users-devices` WHERE iduser=? AND iddevice=?;', [req.user.iduser, req.query.iddevice]);
    var message;
    if (check.length > 0) {
        const iddevice = req.query.iddevice
        const deviceOptions = await pool.query('SELECT * FROM swich_controler_db.devices WHERE iddevice=?;', [iddevice]);
        const deviceTags = await pool.query('SELECT * FROM swich_controler_db.devicetags WHERE iddevice=?;', [iddevice]);
        deviceOptions[0].optionA_tag = deviceTags[0].optionA;
        deviceOptions[0].optionB_tag = deviceTags[0].optionB;
        deviceOptions[0].optionC_tag = deviceTags[0].optionC;
        deviceOptions[0].optionD_tag = deviceTags[0].optionD;
        deviceOptions[0].optionE_tag = deviceTags[0].optionE;
        deviceOptions[0].powerA_tag = deviceTags[0].powerA;
        deviceOptions[0].powerB_tag = deviceTags[0].powerB;
        deviceOptions[0].powerC_tag = deviceTags[0].powerC;
        deviceOptions[0].powerD_tag = deviceTags[0].powerD;
        deviceOptions[0].powerE_tag = deviceTags[0].powerE;
        if (deviceOptions[0].optionA == 0) deviceOptions[0].optionA = undefined;
        if (deviceOptions[0].optionB == 0) deviceOptions[0].optionB = undefined;
        if (deviceOptions[0].optionC == 0) deviceOptions[0].optionC = undefined;
        if (deviceOptions[0].optionD == 0) deviceOptions[0].optionD = undefined;
        if (deviceOptions[0].optionE == 0) deviceOptions[0].optionE = undefined;
        if (req.query.message) {
            message = req.query.message;
            res.render('pages/en/control', {stylesheet: '/css/pages/control.css', script: '/js/pages/control.js', deviceOptions, iddevice, message});
        } else {
            res.render('pages/en/control', {stylesheet: '/css/pages/control.css', script: '/js/pages/control.js', deviceOptions, iddevice});
        }
    } else {
        message = 'You+do+not+have+access+to+this+device.';
        res.redirect('/en/panel?message=' + message);
    }
});

router.post('/panel/control', auth.isLoggedIn_en, async (req, res) => {
    const check = await pool.query('SELECT iduserdevice FROM swich_controler_db.`users-devices` WHERE iduser=? AND iddevice=?;', [req.user.iduser, req.query.iddevice]);
    if (check.length > 0) {
        const send = req.query;
        var row;
        if (!(send.optionA == null)) {
            row = await pool.query('UPDATE `swich_controler_db`.`devices` SET `optionA` = ? WHERE (`iddevice` = ?);', [send.optionA, send.iddevice]);
        }
        if (!(send.optionB == null)) {
            row = await pool.query('UPDATE `swich_controler_db`.`devices` SET `optionB` = ? WHERE (`iddevice` = ?);', [send.optionB, send.iddevice]);
        }
        if (!(send.optionC == null)) {
            row = await pool.query('UPDATE `swich_controler_db`.`devices` SET `optionC` = ? WHERE (`iddevice` = ?);', [send.optionC, send.iddevice]);
        }
        if (!(send.optionD == null)) {
            row = await pool.query('UPDATE `swich_controler_db`.`devices` SET `optionD` = ? WHERE (`iddevice` = ?);', [send.optionD, send.iddevice]);
        }
        if (!(send.optionE == null)) {
            row = await pool.query('UPDATE `swich_controler_db`.`devices` SET `optionE` = ? WHERE (`iddevice` = ?);', [send.optionE, send.iddevice]);
        }
        res.redirect('/en/panel/control?iddevice=' + send.iddevice);
    }
});

router.post('/panel/control/changeNameOption', auth.isLoggedIn_en, async (req, res) => {
    const check = await pool.query('SELECT iduserdevice FROM swich_controler_db.`users-devices` WHERE iduser=? AND iddevice=?;', [req.user.iduser, req.query.iddevice]);
    var message;
    if (check.length > 0) {
        if (req.body.valueField.length > 0) {
            if (req.query.key == "device") await pool.query('UPDATE `swich_controler_db`.`devices` SET `namedevice` = ? WHERE (`iddevice` = ?);', [req.body.valueField, req.query.iddevice]);
            if (req.query.key == "oa") await pool.query('UPDATE `swich_controler_db`.`devicetags` SET `optionA` = ? WHERE (`iddevice` = ?);', [req.body.valueField, req.query.iddevice]);
            if (req.query.key == "ob") await pool.query('UPDATE `swich_controler_db`.`devicetags` SET `optionB` = ? WHERE (`iddevice` = ?);', [req.body.valueField, req.query.iddevice]);
            if (req.query.key == "oc") await pool.query('UPDATE `swich_controler_db`.`devicetags` SET `optionC` = ? WHERE (`iddevice` = ?);', [req.body.valueField, req.query.iddevice]);
            if (req.query.key == "od") await pool.query('UPDATE `swich_controler_db`.`devicetags` SET `optionD` = ? WHERE (`iddevice` = ?);', [req.body.valueField, req.query.iddevice]);
            if (req.query.key == "oe") await pool.query('UPDATE `swich_controler_db`.`devicetags` SET `optionE` = ? WHERE (`iddevice` = ?);', [req.body.valueField, req.query.iddevice]);
            res.redirect('/en/panel/control?iddevice=' + req.query.iddevice);
        } else {
            message = 'The+name+is+invalid.';
            res.redirect('/en/panel/control?iddevice=' + req.query.iddevice + '&message=' + message);
        }
    } else {
        res.redirect('/en/panel/panel');
    }
});

module.exports = router;