const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const row = await pool.query('SELECT * FROM `swich_controler_db`.`users` WHERE username = ?', [username]);
    if (row.length > 0) {
        const user = row[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'welcome ' + user.username));
        } else {
            done(null, false, req.flash('Incorrect password.'));
        }
    } else {
        return done(null, false, req.flash('The user does not exist.'));
    }
}));

passport.use('local.register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname, email } = req.body;
    const newUser = {
        fullname,
        email,
        username,
        password
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO `swich_controler_db`.`users` SET ?', [newUser]);
    newUser.iduser = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.iduser);
});

passport.deserializeUser(async (iduser, done) => {
    const row = await pool.query('SELECT * FROM `swich_controler_db`.`users` WHERE iduser = ?', [iduser]);
    done(null, row[0]);
});