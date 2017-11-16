var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var item = mongoose.model('item');

router.get('/items', function(req, res, next) {
  item.find(function(err, items){
    if(err){ return next(err); }
    res.json(items);
  });
});

router.post('/items', function(req, res, next) {
  var item = new item(req.body);
  item.save(function(err, item){
    if(err){ return next(err); }
    res.json(item);
  });
});

router.param('item', function(req, res, next, id) {
  var query = Item.findById(id);
  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error("can't find comment")); }
    req.item = item;
    return next();
  });
});

router.get('/items/:item', function(req, res) {
  res.json(req.item);
});



router.delete('/items/:item', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});


module.exports = router;
