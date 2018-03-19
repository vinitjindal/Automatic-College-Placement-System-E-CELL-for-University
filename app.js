// ================
// Declarations
// ================

var express         =   require("express"),
    app             =   express(),
    bodyParser      =   require("body-parser"),
    mongoose        =   require("mongoose"),
    ejs             =   require("ejs"),
    methodOverride  =   require("method-override");

mongoose.connect("mongodb://localhost/company");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.use(express.static("public"));

app.set("view engine","ejs");

var companySchema = new mongoose.Schema({
    companyName:String,
    branch:String,
    lastDate:String,
    QuerlyID:String,
    projectSkill:String,
    minCgpa:String,
    typeCompany:String
});

var Company = mongoose.model("Company",companySchema);

// Company.create({
//     companyName : "armin",
//     branch : "CSE",
//     lastDate : "21/12/2017",
//     QuerlyID : "23@gmail.com", 
//     projectSkill : "CD",
//     minCgpa :"34",
//     typeCompany : "Network"
    
// },function(err,company){
//     if(err){
//         console.log("Something is wrong");
//     }
//     else
//     {
//         console.log(company);
//     }
// });


// ======= ROUTES ==========
app.get("/",function(req,res){
    res.render("index");
})

app.get("/login",function(req, res) {
    res.render("login");
})

app.get("/user/admin",function(req, res) {
    res.render("admin");
})

app.post("/user/admin",function(req, res) {
    //Get data from form & Save it to DB ;
    Company.create(req.body.company,function(err,newCompany){
        if(err){
            console.log("error created");
        }
        else
        {
            console.log("DB created");
            console.log(newCompany);
        }
    });
    res.redirect("/user/admin/adminView");
});

app.get("/user/admin/adminView",function(req, res) {
    //Get all Company From Database
    Company.find({},function(err,allCompany){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("adminView",{companies:allCompany});
        }
    });
})
app.delete("/user/admin/adminView/:id",function(req, res) {
    Company.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
        console.log(err);    
        }
        else
        {
            res.redirect("/user/admin/adminView/");
        }
        
    });
})

app.get("/user/admin/adminRecruited/:id",function(req, res) {
    
    Company.findById(req.params.id,function(err,Company){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("adminRecruited",{company:Company});
        }
    });
})

app.get("/user/:username/editApp",function(req,res){
    res.render("userInput");
})

app.get("/user/:username/userView",function(req, res) {
    res.render("userView");
})

// ==========================


// Listening the PORT And IP Output 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});