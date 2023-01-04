const express = require('express');
const morgan = require('morgan');
const shortUrlRouter = require('./routes/shorturlRoutes');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

console.log(process.env.NODE_ENV)
app.use(cors());
app.options('*', cors());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use(mongoSanitize());
app.use(xss());


app.use('/api', shortUrlRouter);

module.exports = app;