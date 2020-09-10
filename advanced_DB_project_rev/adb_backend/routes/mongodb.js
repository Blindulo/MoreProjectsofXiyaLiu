var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
module.exports = router;
const Schema = mongoose.Schema;

const mongoDB = ("mongodb+srv://tong:adb12345!@cluster0-anlie.mongodb.net/adb");
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});

// @Chuanlu Chen
// Query 1: The average price of commodity “Bread” in each country
router.post('/query1', function(req, res) {
  var product_name = req.body.product_name;  // variable passing from front-end
  //var product_name = 'Bananas'; // just for test

  Model.aggregate([
    {$match:{"cm_name":product_name}},
    {$group: { _id: "$adm0_name",avgPrice: {$avg: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  });
  
// @Chuanlu Chen
//Query 2: The average price of commodity “Wheat” in each locality of the country “Afghanistan”
router.post('/query2', function(req, res) {
    var product_name = req.body.product_name;// variable passing from front-end
    var country = req.body.country;// variable passing from front-end
  
  
  //var product_name = "Wheat"; // just for test
 //var country = "Afghanistan"; // just for test

  Model.aggregate([
    {$match:{$and:[{"cm_name":product_name},{"adm0_name":country}]}},
    {$group: { _id: "$adm1_name",avgPrice: {$avg: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  });

// @Chuanlu Chen
//Query 3: The highest price of commodity “Rice” in each market type in each country
router.post('/query3', function(req, res) {  
  var product_name = req.body.product_name;// variable passing from front-end
  
  //var product_name = 'Rice'; // just for test

  Model.aggregate([
    {$match:{"cm_name":product_name}},
    {$group: { _id: {"market_type":"$pt_name","country":"$adm0_name"},maxPrice: {$max: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  }); 


// @Chuanlu Chen
//Query 4: The lowest price of commodity “Bread” in each market in the country “Afghanistan”
router.post('/query4', function(req, res) {  
  var product_name = req.body.product_name;// variable passing from front-end
  var country = req.body.country;// variable passing from front-end

  //var product_name = 'Bread'; // just for test
  //var country = 'Afghanistan'; // just for test
  
  Model.aggregate([
    {$match:{$and:[{"cm_name":product_name},{"adm0_name":country}]}},
    {$group: { _id:"$mkt_name",minPrice: {$min: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  }); 


// @Chuanlu Chen
// Query 5: The average price of commodity “Bread” each year in the country “Afghanistan”
router.post('/query5', function(req, res) {  
  var product_name = req.body.product_name;// variable passing from front-end
  var country = req.body.country;// variable passing from front-end
  
  //var product_name = 'Bread'; // just for test
  //var country = 'Afghanistan'; // just for test

  Model.aggregate([
    {$match:{$and:[{"cm_name":product_name},{"adm0_name":country}]}},
    {$group: { _id:"$mp_year",avgPrice: {$avg: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  }); 
//@ Tong Wang
// query 6: The highest price of particular commodity each month in the particular country

router.post('/query6', function(req,res){
  var product_name = req.body.product_name;
  var country = req.body.country;

  // var product_name = 'Rice'; // just for test
  // var country = 'Algeria'; // just for test
  Model.aggregate([
    {$match:{$and:[{"cm_name":product_name},{"adm0_name":country}]}},
    {$group: { _id:"$mp_month",maxPrice: {$max: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
});


//@ Tong Wang
// query 7:  /* The lowest price of each commodity in the particular market */
router.post('/query7', function(req,res){
  var market = req.body.market;
  //var market = 'Algiers'; // just for test
  Model.aggregate([
    {$match:{"mkt_name":market}},
    {$group: { _id:"$cm_name",minPrice: {$min: '$mp_price'}}},
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  
  
});

//@ Tong Wang
// query 8: The commodity (name) which has highest price in the particular market */
/*
router.post('/query8', function(req,res){
  Model.find({'mkt_name' : req.body.market})
  .exec()
  .then(data=>{
    Model.aggregrate([
      {group : {_id : "$cm_id", maxPrice : {$max : '$mp_price'}}},
    ])
  })
});
*/

// query 8
router.post('/query8', function(req,res){
  var market = req.body.market;
  //var market = 'Algiers'; // just for test
  Model.aggregate([
    {$match:{"mkt_name":market}},
    {$sort: { 'mp_price':-1}},
    {$limit:1},
    {$project : {
        _id:0,
        cm_name : 1 ,
        mp_price : 1 ,
    }}
  ], function (err, results) {
                if (err)
                    console.log(err);
                else
                    res.json(results);
                    console.log(results);
            });
  
});


// @Chuanlu Chen
// query 9: Get product_name through country -- just for frontend
router.post('/query9', function(req, res) {  
  var country = req.body.country;// variable passing from front-end

  //var country = 'Afghanistan'; // just for test
  
  Model.distinct( "cm_name",{"adm0_name":country}, 
             function (err, results) {
                if (err)
                    console.log(err);
                else
                    console.log(results);
                    res.json(results);
                    
            });
});

// @Chuanlu Chen
// query 10: Get market through country  -- just for frontend
router.post('/query10', function(req, res) {  
  var country = req.body.country;// variable passing from front-end

  //var country = 'Afghanistan'; // just for test
  
  Model.distinct("mkt_name",{"adm0_name":country}, 
             function (err, results) {
                if (err)
                    console.log(err);
                else
                    console.log(results);
                    res.json(results);
            });
});

// Data Model 
var wmfpSchema = new mongoose.Schema({
    adm0_id: Number,
    adm0_name: String,
    adm1_id: Number,
    adm1_name: String,
    mkt_id: Number,
    mkt_name: String,
    cm_id: Number,
    cm_name: String,
    cur_id: Number,
    cur_name: String,
    pt_id: Number,
    pt_name: String,
    um_id: Number,
    um_name: String,
    mp_month: Number,
    mp_year: Number,
    mp_price: Number,
    mp_commoditysource: String
  });


// load model
const Model = mongoose.model("wmfp", wmfpSchema,"wmfp");

module.exports = router;

