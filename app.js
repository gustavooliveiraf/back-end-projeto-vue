const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const usersRoutes = require('./server/routes/user');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use('/users', usersRoutes)

app.get('*', (req, res) => res.status(200).send({
  message: 'Rota não encontrada, verifique se digitou corretamente.',
}));

module.exports = app;