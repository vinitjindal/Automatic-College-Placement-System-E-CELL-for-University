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
    rollNo:     { type: Number, default: 0 },
    password:   { type: String, default: "NA" },
    firstName:  { type: String, default: "NA" },
    midName:    { type: String, default: "NA" },
    lastName:   { type: String, default: "NA" },
    mobileNo:   { type: String, default: "NA" }, 
    gender:     { type: String, default: "NA" },
    dob:        { type: String, default: "NA" },
    fatherName: { type: String, default: "NA" },
    mailId:     { type: String, default: "NA" },
    state:      { type: String, default: "NA" },
    town:       { type: String, default: "NA" },
    houseNo:    { type: String, default: "NA" },
    street:     { type: String, default: "NA" },
    pinCode:    { type: String, default: "NA" },
        edu10Name:      { type: String, default: "NA" },
        edu10Type:      { type: String, default: "NA" },
        edu10Board:     { type: String, default: "NA" },
        edu10Stream:    { type: String, default: "NA" },
        edu10Year:      { type: String, default: "NA" },
        edu10CgpaObt:           { type: String, default: "NA" },
        edu10CgpaMax:           { type: String, default: "NA" },
            edu12Name:              { type: String, default: "NA" },
            edu12Type:              { type: String, default: "NA" },
            edu12Board:             { type: String, default: "NA" },
            edu12Stream:            { type: String, default: "NA" },
            edu12Year:              { type: String, default: "NA" },
            edu12CgpaObt:           { type: String, default: "NA" },
            edu12CgpaMax:           { type: String, default: "NA" },
                eduGradName:        { type: String, default: "NA" },
                eduGradType:        { type: String, default: "NA" },
                eduGradBoard:       { type: String, default: "NA" },
                eduGradStream:      { type: String, default: "NA" },
                eduGradYear:        { type: String, default: "NA" },
                eduGradCgpaObt:      { type: Number, default: 0 },
                eduGradCgpaMax:       { type: Number, default: 0 },
        gitHub:String,
        skillTag:String
});

var Company = mongoose.model("Company",companySchema);
var Student = mongoose.model("Student",studentSchema);


// ======= ROUTES ==========
app.get("/",function(req,res){
    res.render("index");
});

app.get("/login",function(req, res) {
    res.render("login");
});

app.post("/login",function(req, res) {
  
  res.redirect("user/"+req.body.student.username+"/userEdit");
});

app.get("/signup",function(req, res) {
    res.render("signup");
});

app.post("/signup",function(req, res) {
    Student.create(req.body.student,function(err,newStudent){
        if(err){
            console.log(err);
        }
        else
        {
            console.log("DB created");
            console.log(newStudent);
        }
    });
    res.redirect("/login");
});

app.get("/user/admin",function(req, res) {
    res.render("admin");
});

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
});
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
});

app.get("/user/admin/adminRecruited/:id",function(req, res) {
    
    Company.findById(req.params.id,function(err,Company){
        if(err){
            console.log(err);
        }
        else
        { 
            Student.find({},function(err,allStudent){
            if(err){
                console.log(err);
            }
            else
            {   console.log(Company);
                console.log(allStudent);
                res.render("adminRecruited",{company:Company,student:allStudent});
            }
            });
        }
    });
});

app.get("/user/:username/userEdit",function(req,res){
    Student.find({rollNo:req.params.username}).find(function(err,user){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(user.length);
            console.log(JSON.stringify(user));
    res.render("userInput",{rollno:req.params.username,prefiled:user});
        }
    });
    
});



app.post("/user/:username/userEdit",function(req,res){
    Student.update({rollNo:req.params.username},{
    firstName       :   req.body.student.firstName,
    midName         :   req.body.student.midName,
    lastName        :   req.body.student.lastName,
    mobileNo        :   req.body.student.mobileNo,
    gender          :   req.body.student.gender,
    dob             :   req.body.student.dob,
    mailId            :   req.body.student.mailId   ,
    state             :   req.body.student.state    ,
    town              :   req.body.student.town   ,
    houseNo           :   req.body.student.houseNo  ,
    street            :   req.body.student.street  ,
    pinCode           :   req.body.student.pinCode,
        edu10Name         :   req.body.student.edu10Name    ,
        edu10Type         :   req.body.student.edu10Type    ,
        edu10Board        :   req.body.student.edu10Board   ,
        edu10Stream       :   req.body.student.edu10Stream  ,
        edu10Year         :   req.body.student.edu10Year    ,
        edu10CgpaObt      :   req.body.student.edu10CgpaObt ,
        edu10CgpaMax      :   req.body.student.edu10CgpaMax ,
            edu12Name         :   req.body.student.edu12Name    ,
            edu12Type         :   req.body.student.edu12Type    ,
            edu12Board        :   req.body.student.edu12Board   ,
            edu12Stream       :   req.body.student.edu12Stream  ,
            edu12Year         :   req.body.student.edu12Year    ,
            edu12CgpaObt      :   req.body.student.edu12CgpaObt ,
            edu12CgpaMax      :   req.body.student.edu12CgpaMax ,
                eduGradName   :   req.body.student.eduGradName      ,
                eduGradType   :   req.body.student.eduGradType      ,
                eduGradBoard  :   req.body.student.eduGradBoard     ,
                eduGradStream :   req.body.student.eduGradStream    ,
                eduGradYear   :   req.body.student.eduGradYear      ,
                eduGradCgpaObt:   req.body.student.eduGradCgpaObt   ,
                eduGradCgpaMax:   req.body.student.eduGradCgpaMax   ,
        gitHub    : req.body.student.gitHub,
        skillTag  : req.body.student.skillTag
    },function(err,object){
        if(err){
            console.log(err);
        }
        else
        console.log(object);
    })
    
    res.redirect("/user/"+req.params.username+"/userView");
});

app.get("/user/:username/userView",function(req, res) {
    Student.find({rollNo:req.params.username}).find(function(err,user){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(user.length);
            console.log(JSON.stringify(user));
            res.render("userView",{student:user});
        }
    });
});

// ==========================


// Listening the PORT And IP Output 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});