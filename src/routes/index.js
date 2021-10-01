const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/en');
});

router.use('/en', require('./en/index'));
router.use('/es', require('./es/index'));

router.use(require('./authentication/index'));

module.exports = router;