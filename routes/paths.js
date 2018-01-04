/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於_group的Schema
var _path = new Schema({
	path_id : String ,
    group_id: String ,
	way :  String ,			//路徑
	start_location : String ,
	end_location : String ,
	km : Number 
	
},{
    versionKey: false
},{
	collection : 'paths'
});
 
 
//建出model
var path = mongoose.model('path', _path );   
//mongoDB connect
//mongoose.connect('mongodb://user:user@ds011903.mlab.com:11903/runningman');


/* GET THE _path */
router.route('/:id').get(function(req, res) {
	// Find THE user
	path.find({user_id:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

router.route('/:id').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	path.update({ path_id : req.params.id },{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});

/*Post a _path to the collection'groups'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the _path model
	var post_path = new path();
	
	// set the _path key-value (comes from the request) 運用postman
	post_path.path_id = req.body.path_id;
	post_path.group_id = req.body.group_id;
	post_path.way = req.body.way;
	post_path.start_location = req.body.start_location;
	post_path.end_location = req.body.end_location;
	post_path.km = req.body.km;
	
	// save the _path and check for errors
	post_path.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'path created!' });
	});
});

router.route('/:id').delete(function(req, res) {
	// Find THE user
	path.remove({path_id:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	}).exec();
});

module.exports = router;