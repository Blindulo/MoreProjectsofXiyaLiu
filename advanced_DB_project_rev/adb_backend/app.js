const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
const morgan = require('morgan');

app.use(morgan('short'));

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, X-Requested-With,Origin, X-Requested-With,Content-Type,Accept");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/mysql', require('./routes/mysql'));
app.use('/mongodb', require('./routes/mongodb'));
app.use('/neo4j', require('./routes/neo4j'));
app.use(express.static('./public'));

const port = 5000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});