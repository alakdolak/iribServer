let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let compression = require('compression');
let passport = require('passport');
let session = require('express-session');
const multer = require('multer');
let cors = require('cors');
const cron = require('node-cron');
// var RedisStore = require('connect-redis')(session);

let mainController = require('./controllers/main');



// routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let apiRouter = require('./routes/api');
let factoryRouter = require('./routes/factory');
let relations = require('./database/relations');

let app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let task = cron.schedule('*/1 * * * *', () => {
    mainController.automaticAssignment();
});

// let task2 = cron.schedule('*/1 * * * *', () => {
//     mainController.automaticReplacement();
// });

task.start();
// task2.start();

// var whitelist = ['http://192.168.59.129', 'http://192.168.59.129:3002', 'http://127.0.0.1:3002', 'http://localhost:3002' , 'http:/192.168.200.33'];
// var corsOptions = {
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     preflightContinue: false,
//     credentials: true,
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// };
//
// app.use(cors());
// app.options('*', cors(corsOptions)); // include before other routes


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3002");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});

// app.use(function (req, res, next) {
//     let allowedOrigins = ['http://127.0.0.1:3002', 'http://localhost:3002', 'http://localhost:3002/',];
//     let origin = req.headers.origin;
//     if (allowedOrigins.indexOf(origin) > -1) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
global.staticPath = (path.join(__dirname, 'public'));
app.use(session({
    path: '/',
    secret: 'password',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    },
    //store: new RedisStore(),
    maxAge: 60 * 60 * 1000,
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/factory', factoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000);

module.exports = app;
