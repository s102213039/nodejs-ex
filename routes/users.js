/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於run_result的Schema
var user_schrma = new Schema({
    _id : String ,
	name :  String ,
	birthday : String ,
	gender : String ,
	email : String ,
	intro : String ,
	url : String
},{
    versionKey: false
},{
	collection : 'users'
});

//建出model
var user = mongoose.model('user', user_schrma );   


/* GET THE run_result */
router.route('/:id').get(function(req, res) {
	// Find THE user
	user.find({name:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});


/* GET THE run_result */
router.route('/searchname/:id').get(function(req, res) {
	// Find THE user
	user.find({name:{$regex: req.params.id}}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});


/* Patch THE run_result*/
router.route('/:id').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	user.update({ name : req.params.id },{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});


/*Post a run_result to the collection'runresults'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the run_result model
	var post_user = new user();
	
	// set the run_result key-value (comes from the request) 運用postman
	post_user._id = req.body._id;
	post_user.name = req.body.name;
	post_user.birthday = req.body.birthday;
	post_user.gender = req.body.gender;
	post_user.email = req.body.email;
	post_user.intro = req.body.intro;
	post_user.url = req.body.url;
	

	
	
	
	// save the run_result and check for errors
	post_user.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'user created!' });
	});
});

module.exports = router;