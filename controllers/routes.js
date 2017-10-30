var db  = require('../models');
var express = require('express');
var router  = express.Router();

// main page load
router.get("/", function(req , res) {
    db.Burger.findAll({
    }).then(function(results) {
	var burgers = {burgers: results};
	console.log("getting burgers");
	res.render("index", burgers);
    });
});

// create new burger
router.post("/burgers", function(req, res) {
    //console.log(req.body);
    db.Burger.create({
	burger_name: req.body.burger_name
    }).then(function(newBurger){
	console.log("reloading burgers");
	res.json(newBurger);
    }).catch(function(err) {
	res.json(err);
    });

});

// update devour it
router.put("/:id", function(req, res) {
    console.log("devouring my burger");
    db.Burger.update({devoured: true} ,{
	where: {id: req.params.id}
    }).then(function(results){
	console.log("ate the burger");
	res.json(results);
    }).catch(function(err){
	res.json(err);
    });

});

module.exports = router;