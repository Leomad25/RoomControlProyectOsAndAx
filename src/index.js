const express = require('express');
const device = require('express-device');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initializations
const app =  express();
const http = require('http').Server(app);
require('./lib/passport');

// Settings
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(device.capture());
app.use(session({
    secret: 'nodesession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variable
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/modules/getData'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
http.listen(app.get('port'), async function() {
    console.log("Server runing");
    console.log("listening on *:" + app.get('port'));
});