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
    password:   { type: String, default: 0 },
    firstName:  { type: String, default: "NA" },
    midName:    { type: String, default: "NA" },
    lastName:   { type: String, default: "NA" },
    mobileNo:   { type: Number, default: 0 },
    gender:     { type: String, default: "NA" },
    dob:        { type: String, default: "NA" },
    fatherName: { type: String, default: "NA" },
    mailId:     { type: String, default: "NA" },
    state:      { type: String, default: "NA" },
    town:       { type: String, default: "NA" },
    houseNo:    { type: String, default: "NA" },
    street:     { type: String, default: "NA" },
    pinCode:    { type: Number, default: 0 },
        edu10Name:      { type: String, default: "NA" },
        edu10Type:      { type: String, default: "NA" },
        edu10Board:     { type: String, default: "NA" },
        edu10Stream:    { type: String, default: "NA" },
        edu10Year:      { type: String, default: "NA" },
        edu10CgpaObt:   { type: Number, default: 0 },
        edu10CgpaMax:   { type: Number, default: 0 },
            edu12Name:              { type: String, default: "NA" },
            edu12Type:              { type: String, default: "NA" },
            edu12Board:             { type: String, default: "NA" },
            edu12Stream:            { type: String, default: "NA" },
            edu12Year:              { type: String, default: "NA" },
            edu12CgpaObt:           { type: Number, default: 0 },
            edu12CgpaMax:           { type: Number, default: 0 },
                eduGradName:        { type: String, default: "NA" },
                eduGradType:        { type: String, default: "NA" },
                eduGradBoard:       { type: String, default: "NA" },
                eduGradStream:      { type: String, default: "NA" },
                eduGradYear:        { type: String, default: "NA" },
                eduGradCgpaObt:     { type: Number, default: 0 },
                eduGradCgpaMax:     { type: Number, default: 0 },
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
});

app.get("/login",function(req, res) {
    res.render("login");
});

app.post("/login",function(req, res) {
  
  res.redirect("user/"+req.body.student.username+"/userEdit");
//   console.log(req.body.student.pass);
//   res.redirect("/user/"+username+"/userEdit");
   
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
           res.render("adminRecruited",{company:Company});
        }
    });
});

app.get("/user/:username/userEdit",function(req,res){
    
    res.render("userInput",{rollno:req.params.username});
});


var user;


app.post("/user/:username/userEdit",function(req,res){
    var url;
    Student.create(req.body.student,function(err,newStudent){
        if(err){
            console.log("error created");
        }
        else
        { 
            console.log("DB created");
            console.log(newStudent);
            console.log("()()()()()()()()()"+newStudent._id+"999999999999999999999");

            
            // res.redirect("/user/"+user+"/userEdit");
        }
    });
    res.redirect("/user/:username/userView");
});

app.get("/user/:username/userView",function(req, res) {
    res.render("userView");
});

// ==========================


// Listening the PORT And IP Output 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});