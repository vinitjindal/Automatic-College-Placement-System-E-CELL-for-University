var mongoose        =   require("mongoose");
var Company         =   require("./models/company");
var Student         =   require("./models/students");

function seedDB() {
Company.remove({},function(err){
    if(err){
        console.log(err);
    }
    else
    {
        console.log("Company Database Removed");
    }
            });

Student.remove({},function(err){
    if(err){
        console.log(err);
    }
    else
    {
        console.log("Student Database Removed");
    }
          });
    
}
module.exports = seedDB();

