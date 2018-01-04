/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於run_result的Schema
var run_result = new Schema({
	user_id : String ,
    distance: Number ,
	time :  Number ,
	avg_speed : Number ,
	date : Date
},{
    versionKey: false
},{
	collection : 'runresults'
});
 
 
//建出model
var runresult = mongoose.model('runresult', run_result );   
//mongoDB connect
//mongoose.connect('mongodb://user:user@ds011903.mlab.com:11903/runningman');


/* GET THE run_result */
router.route('/:id').get(function(req, res) {
	// Find THE user
	runresult.find({user_id:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

/*Post a run_result to the collection'runresults'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the run_result model
	var post_runresult = new runresult();
	
	// set the run_result key-value (comes from the request) 運用postman
	post_runresult.user_id = req.body.user_id;
	post_runresult.distance = req.body.distance;
	post_runresult.time = req.body.time;
	post_runresult.avg_speed = req.body.avg_speed;
	post_runresult.date = Date();
	
	// save the run_result and check for errors
	post_runresult.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'run_result created!' });
	});
});

module.exports = router;