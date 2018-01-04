/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於_group的Schema
var _notice = new Schema({
	user_name: String ,
	notice_name : String ,
	status : String ,
    content: String  ,
	ViewType : String ,
	groupname : String 
	
},{
    versionKey: false
},{
	collection : 'notices'
});
 
 
//建出model
var notice = mongoose.model('notice', _notice );   
//mongoDB connect
//mongoose.connect('mongodb://user:user@ds011903.mlab.com:11903/runningman');


/* GET THE _notice */
router.route('/:name').get(function(req, res) {
	// Find THE user
	notice.find({notice_name : req.params.name , status:"0"}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});


/* Patch THE run_result*/
router.route('/:user_name/:notice_name').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	notice.update({ user_name : req.params.user_name,notice_name : req.params.notice_name},{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});


/*Post a _notice to the collection'groups'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the _notice model
	var post_notice = new notice();
	
	// set the _notice key-value (comes from the request) 運用postman
	post_notice.user_name = req.body.user_name;
	post_notice.notice_name = req.body.notice_name;
	post_notice.status = "0";
	post_notice.content = req.body.content;
	post_notice.ViewType = req.body.ViewType;
	if(req.body.groupname!=null){
		post_notice.groupname = req.body.groupname;
	}
	else{
		post_notice.groupname ="0";
	}
	
	//post_notice.deadline =new Date().getTime() + 86400000 * 3 - 14400;
	
	// save the _notice and check for errors
	post_notice.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'notice created!' });
	});
});

module.exports = router;