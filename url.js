var mongoose = require("mongoose");

var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = mongoose.Schema({
      "original_url": String,
      "shortened_url": Number
});

var Url = mongoose.model('Url', urlSchema);

urlSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.shortened_url = counter.seq;
        next();
    });
});

module.exports = Url;