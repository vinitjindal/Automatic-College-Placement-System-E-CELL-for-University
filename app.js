var express=require("express");
var app=express();

app.use(express.static("public"));

app.set("view engine","ejs");

// ======= ROUTES ==========
app.get("/",function(req,res){
    res.render("index.ejs");
})

app.get("/login",function(req, res) {
    res.render("login.ejs");
})

app.get("/user/admin",function(req, res) {
    res.render("admin.ejs");
})

app.get("/user/admin/adminView",function(req, res) {
    res.render("adminView.ejs");
})

app.get("/user/admin/adminRecruited",function(req, res) {
    res.render("adminRecruited.ejs");
})

app.get("/user/:username/editApp",function(req,res){
    res.render("userInput.ejs");
})

app.get("/user/:username/userView",function(req, res) {
    res.render("userView.ejs");
})

// ==========================


// Listening the PORT And IP Output 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});