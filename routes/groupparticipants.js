/**
 * Created by atulr on 05/07/15.
 */
var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose來處理對mongoDB的query
var Schema   = mongoose.Schema;

//建構屬於run_result的Schema
var group_participant = new Schema({
	user_id : String ,
    group_id: String ,
	status :  Number ,
	notice : String 
},{
    versionKey: false
},{
	collection : 'groupparticipants'
});
 
 
//建出model
var groupparticipant = mongoose.model('groupparticipant', group_participant );   
//mongoDB connect
//mongoose.connect('mongodb://user:user@ds011903.mlab.com:11903/runningman');


/* GET THE group_participant */
router.route('/:id').get(function(req, res) {
	// Find THE user
	groupparticipant.find({user_id:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	});
});

router.route('/:id').patch(function(req, res) {
	
		var Change = req.body;
	//判斷request有哪些修改並對資料庫做更新，回傳result給client
	groupparticipant.update({ _id : req.params.id },{$set:Change}, function(err, result) {
		if (err)
			res.send(err);
		res.send(result);
	});
});

/*Post a group_participant to the collection'group_participant'*/
router.route('/').post(function(req, res) {
	
	// create a new instance of the group_participant model
	var post_group_participant = new groupparticipant();
	
	// set the group_participant key-value (comes from the request) 運用postman
	post_group_participant.user_id = req.body.user_id;
	post_group_participant.group_id = req.body.group_id;
	post_group_participant.status = req.body.status;
	post_group_participant.notice = req.body.notice;
	
	// save the group_participant and check for errors
	post_group_participant.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'group_participant created!' });
	});
});

router.route('/:id').delete(function(req, res) {
	// Find THE user
	groupparticipant.remove({_id:req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		res.json(result);	//用json回應請求者
	}).exec();
});

module.exports = router;