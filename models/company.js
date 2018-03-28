var mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
    companyName:String,
    branch:String,
    lastDate:String,
    QuerlyID:String,
    projectSkill:String,
    minCgpa:Number,
    typeCompany:String
});

module.exports = mongoose.model("Company",companySchema);