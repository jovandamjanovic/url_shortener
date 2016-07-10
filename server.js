var express = require("express");
var mongoose = require("mongoose");
var Url = require("./url.js");

var app = express();
var router = express.Router();
var db = mongoose.connection;

db.on('error', console.error);
mongoose.connect('mongodb://localhost/shortUrls');

router.use(function(req, res, next) {
    next();
});

router.route('/:link').get(function(req, res) {
    Url.findOne({"shortened_url": req.params.link}, function(err, succ) {
       if (err) return err;
       res.redirect(succ.original_url);
    });
});

router.route('/new/*').get(function(req, res) {
    var result = {"original_url": req.url, "shortened_url": null};
    result.original_url = result.original_url.substring(5);
    var newUrl = new Url(result);
    newUrl.save(function (err, succ) {
      if (err) {
          return console.log(err);
      }
      result.shortened_url = succ.shortened_url;
      res.json(result);
    });
});

app.use('/', router);

app.listen(process.env.PORT || 8080, function () {
  console.log('Url shortener listening on port 8080!');
});