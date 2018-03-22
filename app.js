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
    minCgpa:Number,
    typeCompany:String
});

var studentSchema = new mongoose.Schema({
    rollNo:String,
    firstName:String,
    midName:String,
    lastName:String,
    mobileNo:Number,
    gender:String,
    dob:String,
    fatherName:String,
    mailId:String,
    state:String,
    town:String,
    houseNo:String,
    street:String,
    pinCode:Number,
        edu10Name:String,
        edu10Type:String,
        edu10Board:String,
        edu10Stream:String,
        edu10Year:String,
        edu10CgpaObt:String,
        edu10CgpaMax:String,
            edu12Name:String,
            edu12Type:String,
            edu12Board:String,
            edu12Stream:String,
            edu12Year:String,
            edu12CgpaObt:String,
            edu12CgpaMax:String,
                eduGradName:String,
                eduGradType:String,
                eduGradBoard:String,
                eduGradStream:String,
                eduGradYear:String,
                eduGradCgpaObt:String,
                eduGradCgpaMax:String,
        gitHub:String,
        skillTag:String
});

var Company = mongoose.model("Company",companySchema);
var Student = mongoose.model("Student",studentSchema);

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

app.get("/user/:username/userEdit",function(req,res){
    res.render("userInput");
})

app.post("/user/:username/userEdit",function(req,res){
    var user=req.params.student._Id;
    Student.create(req.body.student,function(err,newStudent){
        if(err){
            console.log("error created");
        }
        else
        {
            console.log("DB created");
            console.log(newStudent);
            
            console.log("$$$$$$$$$ "+user);
        }
    });
    res.redirect("/user/:username/userEdit");
})

app.get("/user/:username/userView",function(req, res) {
    res.render("userView");
})

// ==========================


// Listening the PORT And IP Output 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});