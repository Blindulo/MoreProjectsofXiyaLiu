var express = require('express');
var neo4j = require('neo4j-driver').v1;
var router = express.Router();
// Connect to Neo4j, the password is 123456
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));
var session = driver.session();

module.exports = router;

router.post('/test', (req, res) => {
    res.send('Neo4j');
});



router.post('/query1', (req, res) => {
    var product_name = req.body.product_name;
    //var product_name = 'Bread';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)- [rel3:where]->(l:location)) where p.product_name='" + product_name + "' return l.country as country,avg(toFloat(f.price)) as avg_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "country":record._fields[0],
                    "avg_price":record._fields[1]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query2', (req, res) => {
    var product_name = req.body.product_name;
    var country = req.body.country;
    // var product_name = 'Wheat';
    // var country = 'Afghanistan';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where p.product_name='" + product_name + "' and l.country='" + country + "' return l.locality as locality, avg(toFloat (f.price)) as avg_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "locality":record._fields[0],
                    "avg_price":record._fields[1]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query3', (req, res) => {
    var product_name = req.body.product_name;
    //var product_name = 'Rice';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where p.product_name='" + product_name + "' return l.market_type as market_type, l.country as country, max(toFloat (f.price)) as max_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "market_type":record._fields[0],
                    "country":record._fields[1],
                    "max_price":record._fields[2]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query4', (req, res) => {
    var product_name = req.body.product_name;
    var country = req.body.country;
    // var product_name = 'Bread';
    // var country = 'Afghanistan';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where p.product_name='" + product_name + "' and l.country='" + country + "' return l.market as market, l.country, min(toFloat (f.price)) as min_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "market":record._fields[0],
                    //"country":record._fields[1],
                    "min_price":record._fields[2]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query5', (req, res) => {
    var product_name = req.body.product_name;
    var country = req.body.country;
    // var product_name = 'Bread';
    // var country = 'Afghanistan';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where p.product_name='" + product_name + "' and l.country='" + country + "' return t.year as year, avg(toFloat (f.price)) as avg_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "year":record._fields[0],
                    "avg_price":record._fields[1]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query6', (req, res) => {
    var product_name = req.body.product_name;
    var country = req.body.country;
    // var product_name = 'Rice';
    // var country = 'Algeria';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where p.product_name='" + product_name + "' and l.country='" + country + "' return t.month as month,max(toFloat (f.price)) as max_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "month":record._fields[0],
                    "max_price":record._fields[1]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query7', (req, res) => {
    var market = req.body.market;
    //var market = 'Algiers';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where l.market='" + market + "' return p.product_name as product_name, min(toFloat (f.price)) as min_price")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "product_name":record._fields[0],
                    "min_price":record._fields[1]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query8', (req, res) => {
    var market = req.body.market;
    //var market = 'Algiers';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where l.market='" + market + "' return p.product_name as product_name, max(toFloat (f.price)) as max_price order by max_price DESC limit 1")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "product_name":record._fields[0],
                    "max_price":record._fields[1]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query9', (req, res) => {
    var country = req.body.country;
    //var country = 'Afghanistan';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where l.country='" + country + "' return distinct p.product_name")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "product_name":record._fields[0]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});

router.post('/query10', (req, res) => {
    var country = req.body.country;
    //var country = 'Afghanistan';
    var dict=[];
    session
        .run("match ((f:fact)-[rel1:what]->(p:product)),((f:fact)-[rel2:when]->(t:time)),((f:fact)-[rel3:where]->(l:location)) where l.country='" + country + "' return distinct l.market")
        .then(function (result) {
            result.records.forEach(function (record) {
                dict.push({
                    "market":record._fields[0]
                })
            });
            console.log(dict);
            res.json(dict);
        }) 
});