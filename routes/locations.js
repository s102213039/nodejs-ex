/**
 * Created by atulr on 05/07/15.
 */
 //post patch?
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於run_result的Schema
var location_schrma = new Schema({
	groupname:String,
	name : String ,
	lat :  String ,
	log : String ,
	url : String
},{
    versionKey: false
},{
	collection : 'locations'
});

//建出model
var location = mongoose.model('location', location_schrma );   


/* GET THE run_result */ //哪個團的哪個人
router.route('/:groupname/:id').get(function(req, res) {
	// Find THE location
	location.find({groupname:req.params.groupname,name:{$ne : req.params.id}}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

/* Patch THE run_result*/
router.route('/:id').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	location.update({ name : req.params.id },{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});


/*Post a run_result to the collection'runresults'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the run_result model
	var post_location = new location();
	
	// set the run_result key-value (comes from the request) 運用postman
	post_location.name = req.body.name;
	post_location.groupname = req.body.groupname;
	post_location.lat = req.body.lat;
	post_location.log = req.body.log;
	post_location.url = req.body.url;

	// save the run_result and check for errors
	post_location.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'location created!' });
	});
});

module.exports = router;