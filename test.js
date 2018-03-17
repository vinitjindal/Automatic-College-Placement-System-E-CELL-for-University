var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/arrrs");

var companySchema= new mongoose.Schema({
    name : String,
    branch : String,
    date : String,
    emailid : String, 
    skill : String,
    cgpa :"int",
    company : String
});

var company=mongoose.model("company",companySchema);

var amazon=new company({
    name : "armin",
    branch : "CSE",
    date : "21/12/2017",
    emailid : "23@gmail.com", 
    skill : "CD",
    cgpa :"34",
    company : "Network"
});

amazon.save(function(err,company){
    if(err)
    {
        console.log("SOmethign went wrong");
    }
    else
    {
        console.log(company);
    }
});