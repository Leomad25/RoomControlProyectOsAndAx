const express = require('express');
const auth = require('../../lib/auth');
const router = express.Router();

const pool = require('./../../database');

router.get('/panel/add', auth.isLoggedIn_en, async (req, res) => {
    if (req.query.message) {
        res.render('pages/es/add', {stylesheet: '/css/pages/add.css', message: req.query.message});
    } else {
        res.render('pages/es/add', {stylesheet: '/css/pages/add.css'});
    }
});

router.post('/panel/add', auth.isLoggedIn_en, async (req, res) => {
    const linkedSend = {};
    linkedSend.name = req.body.name;
    linkedSend.mac = req.body.mac;
    linkedSend.ping = req.body.ping;
    linkedSend.password = req.body.password;
    var row;
    var message;
    row = await pool.query('SELECT ping, iddeveiceCirculation FROM swich_controler_db.deveicecirculation WHERE deveicecirculation.mac = ?;', [linkedSend.mac]);
    if (row.length > 0) {
        if (row[0].ping == linkedSend.ping) {
            const iddeveiceCirculation = row[0].iddeveiceCirculation;
            row = await pool.query('SELECT * FROM swich_controler_db.`users-devices` WHERE iddevicecirculation=?;', [iddeveiceCirculation]);
            if (!(row.length > 0)) {
                if ((linkedSend.name.length > 0) && (linkedSend.password.length > 0)) {
                    row = await pool.query('INSERT INTO `swich_controler_db`.`devices` (`namedevice`, `password`) VALUES (?, ?);', [linkedSend.name, linkedSend.password]);
                    const iddevice = row.insertId;
                    row = await pool.query('INSERT INTO `swich_controler_db`.`devicetags` (`iddevice`) VALUES (?);', [iddevice]);
                    row = await pool.query('INSERT INTO `swich_controler_db`.`users-devices` (`iduser`, `iddevice`, `iddevicecirculation`) VALUES (?, ?, ?);', [req.user.iduser, iddevice, iddeveiceCirculation]);
                    res.redirect('/es/panel');
                } else {
                    message = "You+have+to+fill+in+all+the+fields.";
                    res.redirect('/es/panel/add?message=' + message);
                }
            } else {
                message = "The+device+you+are+trying+to+enter+is+already+registered.";
                res.redirect('/es/panel/add?message=' + message);
            }
        } else {
            message = "The+ping+entered+is+invalid.";
            res.redirect('/es/panel/add?message=' + message);
        }
    } else {
        message = "The+MAC+address+that+you+are+entering+is+not+registered.";
        res.redirect('/es/panel/add?message=' + message);
    }
});

module.exports = router;