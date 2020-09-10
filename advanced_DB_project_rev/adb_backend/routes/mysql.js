var express = require('express');
var mysql = require('mysql');
var router = express.Router();
module.exports = router;

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'Project_ADB'
});

router.post('/', (req, res) => {
  res.send('MySQL');
});

/** Place Aggregations **/
/* The average price of particular commodity in each country */
router.post('/query1', (req, res) => {
  // console.log(req.body.product_name);
  
  var product_name = req.body.product_name; // wait for change
  //product_name = 'Bread'; // just for test

  console.log(product_name);
  let sql = 'SELECT country, avg(price) as avg_price from fact, location, product where product_name="' + product_name +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id' +
  ' group by country';


  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/* The average price of particular commodity in each locality of the particular country. */
router.post('/query2', (req, res) => {
  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = "Wheat"; // just for test
  // var country = "Afghanistan"; // just for test

  let sql = 'SELECT locality, avg(price) as avg_price from fact, location, product where product_name="' + product_name +
  '" and country="' + country +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id group by locality';

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/*The highest price of particular commodity in each market type in each country */
router.post('/query3', (req, res) => {
  // console.log(req.body);

  var product_name = req.body.product_name;
  //var product_name = 'Rice'; // just for test

  let sql = 'select market_type, country, max(price) as max_price from fact, location, product where product_name="' + product_name +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id group by market_type, country';

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/* The lowest price of particular commodity in each market in the particular country */
router.post('/query4', (req, res) => {
  // console.log(req.body);

  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = 'Bread'; // just for test
  //var country = 'Afghanistan'; // just for test

  let sql = 'select market, min(price) as min_price from fact, location, product where product_name="' + product_name +
  '" and country="' + country +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id group by market';

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/** Time Aggregations **/
/* The average price of particular commodity each year in the particular country */
router.post('/query5', (req, res) => {
  // console.log(req.body);

  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = 'Bread'; // just for test
  // var country = 'Afghanistan'; // just for test

  let sql = 'select year, avg(price) as avg_price from fact, location, product, time where product_name="' + product_name +
  '" and country="' + country +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id and fact.time_id=time.time_id '+
  'group by year';

  var t1 = new Date().getTime();
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    var t2 = new Date().getTime();
    var runtime = t2-t1;
    res.json(results);
    console.log(results);
  })
});

/* The query is same as query5, but use materialize view, view1_M, to speed up query */
router.post('/query6', (req, res) => {
  // console.log(req.body);

  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = 'Bread'; // just for test
  // var country = 'Afghanistan'; // just for test

  let sql = 'select year, avg_price from view1_M where product_name="' + product_name +
  '" and country="' + country +
  '"';

  var t1 = new Date().getTime();
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    var t2 = new Date().getTime();
    var runtime = t2-t1;
    res.json(results);
    console.log(results);
  })
});

/* The highest price of particular commodity each month in the particular country */
router.post('/query7', (req, res) => {
  // console.log(req.body);
  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = 'Rice'; // just for test
  // var country = 'Algeria'; // just for test

  let sql = 'select month, max(price) as max_price from fact, location, product, time where product_name="'+ product_name +
  '" and country="'+ country +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id and fact.time_id=time.time_id '+
  'group by month';

  var t1 = new Date().getTime();
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    var t2 = new Date().getTime();
    var runtime = t2-t1;
    res.json(results);
    console.log(results);

  })
});

/* The query is same as query7, but use materialize view, view2_M, to speed up query */
router.post('/query8', (req, res) => {
  // console.log(req.body);
  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = 'Rice'; // just for test
  // var country = 'Algeria'; // just for test

  let sql = 'select month, max_price from view2_M where product_name="'+ product_name +
  '" and country="'+ country +
  '"';

  var t1 = new Date().getTime();
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    var t2 = new Date().getTime();
    var runtime = t2-t1;
    res.json(results);
    console.log(results);

  })
});

/** Commodity Aggregations **/
/* The lowest price of each commodity in the particular market */
router.post('/query9', (req, res) => {
  // console.log(req.body);

  var market = req.body.market;
  //var market = 'Algiers'; // just for test

  let sql = 'select product_name, min(price) as min_price from fact, location, product, time where market="'+ market +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id '+
  'group by product_name';


  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/* The commodity (name) which has highest price in the particular market */
router.post('/query10', (req, res) => {
  // console.log(req.body);

  var market = req.body.market;
  //var market = 'Algiers'; // just for test

  let sql = 'select product_name, max(price) as max_price from fact, location, product where market="'+ market +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id GROUP by product_name order by max_price DESC limit 1';


  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/** just for frontend **/
/* Get market through country*/
router.post('/query11', (req, res) => {
  // console.log(req.body);

  var country = req.body.country;
  //var country = 'Algeria'; // just for test

  let sql = 'select market from location where country="'+ country +'"';


  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});

/* Get product_name through country */
router.post('/query12', (req, res) => {
  // console.log(req.body);

  var country = req.body.country;
  //var country = 'Algeria'; // just for test

  let sql = 'select distinct(product_name) from fact, location, product where country="'+ country +
  '" and fact.location_id=location.location_id and fact.product_id=product.product_id ';


  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
});