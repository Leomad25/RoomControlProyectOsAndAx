module.exports = {
    isLoggedIn_es(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/es');
        }
    },

    isLoggedIn_en(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/en');
        }
    },

    isNotLoggedIn_es(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/es/panel');
        }
    },

    isNotLoggedIn_en(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/en/panel');
        }
    }
}