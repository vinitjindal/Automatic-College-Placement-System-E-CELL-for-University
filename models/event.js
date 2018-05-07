var mongoose = require("mongoose");

var eventSchema =  new mongoose.Schema({
    caption:String,
    shortDescript:String,
    eventDetail:String,
    eventDate:String
});

module.exports  =  mongoose.model("Event",eventSchema);