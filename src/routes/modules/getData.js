const express = require('express');
const router = express.Router();

const pool = require('./../../database');

router.get('/assistant/getData', async (req, res) => {
    const send = req.query;
    const passMac = await pool.query('SELECT ping FROM swich_controler_db.deveicecirculation WHERE mac=?;', [send.mac]);
    if (passMac.length > 0) {
        if (passMac[0].ping == send.ping) {
            const idMac = await pool.query('SELECT iddeveiceCirculation FROM swich_controler_db.deveicecirculation WHERE mac=? AND ping=?;', [send.mac, send.ping]);
            const iddevice = await pool.query('SELECT iddevice FROM swich_controler_db.`users-devices` WHERE iddevicecirculation=?;', [idMac[0].iddeveiceCirculation]);
            if (iddevice.length > 0) {
                const result = await pool.query('SELECT optionA, optionB, optionC, optionD, optionE, powerA, powerB, powerC, powerD, powerE FROM swich_controler_db.devices WHERE iddevice=?;', [iddevice[0].iddevice]);
                const obj = result[0];
                const msg = obj.optionA + ':' + obj.optionB + ':' + obj.optionC + ':' + obj.optionD + ':' + obj.optionE + ':' +
                            obj.powerA + ':' + obj.powerB + ':' + obj.powerC + ':' + obj.powerD + ':' + obj.powerE;
                res.send(msg);
            } else {
                const msg = "0:0:0:0:0:0:0:0:0:0"
                res.send(msg);
            }

        }
    }
});

module.exports = router;