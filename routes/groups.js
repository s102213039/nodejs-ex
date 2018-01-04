/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於_group的Schema
var _group = new Schema({
	
	groupname :  String ,
	date : String ,
	time : String , 
	location : String ,
	content : String , 
	privacy : String ,	  //公開or私密		String
	status : String ,    //自己跑or跑團
	username :  String  ,
	creatername : String ,
	start : String , 
	end : String ,
	imagename : String ,
	count : String 
},{
    versionKey: false
},{
	collection : 'groups'
});
 
 
//建出model
var group = mongoose.model('group', _group );   
//mongoDB connect
//mongoose.connect('mongodb://user:user@ds011903.mlab.com:11903/runningman');


/* GET 你開的 group */
router.route('/:id').get(function(req, res) {
	// Find THE user
	group.find({creatername:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

/* GET 你加入的 group */
router.route('/joined/:id').get(function(req, res) {
	// Find THE user
	group.find({username:req.params.id , creatername:{$ne : req.params.id} }, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

router.route('/joined/info/:groupname').get(function(req, res) {
	// Find THE user
	
	group.find({groupname:req.params.groupname , creatername:{$ne : null} }, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

/* GET 這個團名的 group */
router.route('/groupname/:id').get(function(req, res) {
	// Find THE user
	group.find({groupname:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});


/* 搜尋指定條件的團 */
router.route('/privacy/:city/:zone/:date').get(function(req, res) {
	// Find THE user
	group.find({privacy:"公開",location:req.params.city+req.params.zone,date:req.params.date}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});


/* Patch THE Group*/
router.route('/:username/:groupname').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	group.update({ username:req.params.username , groupname:req.params.groupname},{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});

/*Post a _group to the collection'groups'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the _group model
	var post_group = new group();
	
	// set the _group key-value (comes from the request) 運用postman
	post_group.content = req.body.content;
	post_group.user_id = req.params.id;
	post_group.status = 0;
	post_group.privacy = req.body.privacy;
	post_group.date = req.body.date;
	post_group.time = req.body.time;
	post_group.username = req.body.username;
	post_group.groupname = req.body.groupname;
	post_group.location = req.body.location;
	post_group.creatername = req.body.creatername;
	post_group.start =req.body.start;
	post_group.end = req.body.end;
	post_group.imagename = req.body.imagename;
	post_group.count = req.body.count;
	
	// save the _group and check for errors
	post_group.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'group created!' });
	});
});

router.route('/:id').delete(function(req, res) {
	// Find THE user
	group.remove({group_id:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	}).exec();
});

module.exports = router;