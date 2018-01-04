/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於run_result的Schema
var friend_list = new Schema({
	user_name : String ,
    friend_name: String ,
	status :  String  
},{
    versionKey: false
},{
	collection : 'friendlists'
});
 
 
//建出model
var friendlist = mongoose.model('friendlist', friend_list );   
//mongoDB connect
//mongoose.connect('mongodb://user:user@ds011903.mlab.com:11903/runningman');

/* GET THE friend_list */
router.route('/:user_name').get(function(req, res) {
	// Find THE user
	friendlist.find({user_name:req.params.user_name , status:"1"}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

/* GET 已送出邀請好友給friemd_name，但尚未接受好友 */
router.route('/:user_name/:friend_name').get(function(req, res) {
	// Find THE user
	friendlist.find({user_name:req.params.user_name,friend_name:req.params.friend_name , status:"0"}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});


/* Patch THE friend_list*/
router.route('/:user_name/:friend_name').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	friendlist.update({ user_name : req.params.user_name,friend_name : req.params.friend_name},{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});


/*Post a friend_list to the collection'friend_list'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the friend_list model
	var post_friend_list = new friendlist();
	
	// set the friend_list key-value (comes from the request) 運用postman
	post_friend_list.user_name = req.body.user_name;
	post_friend_list.friend_name = req.body.friend_name;
	post_friend_list.status = req.body.status;
	
	// save the friend_list and check for errors
	post_friend_list.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'friend_list created!' });
	});
});

router.route('/:user_name/:friend_name').delete(function(req, res) {
	// Find THE user
	friendlist.remove({user_name:req.params.user_name , friend_name:req.params.friend_name}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	}).exec();
});

module.exports = router;