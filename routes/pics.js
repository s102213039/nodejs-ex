
/**
 * Module dependencies
 */

var express = require(‘express’);
var fs = require(‘fs’);
var mongoose = require(‘mongoose’);
var Schema = mongoose.Schema;
var multer = require('multer');

//mongoose.connect(‘url_here’);

var Item = new ItemSchema(
  { img: 
      { data: Buffer, contentType: String }
  }
);
var Item = mongoose.model('Clothes',ItemSchema);

var Item = new ItemSchema(
  { img: 
      { data: Buffer, contentType: String }
  }
);
var Item = mongoose.model('Clothes',ItemSchema);

app.use(multer({ dest: ‘./uploads/’,
 rename: function (fieldname, filename) {
   return filename;
 },
}));

app.post(‘/pics’,function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.pic.path)
 newItem.img.contentType = ‘image/png’;
 newItem.save();
});
