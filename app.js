// ================
// Declarations
// ================

var express                 =   require("express"),
    multer                  =   require("multer"),
    app                     =   express(),
    bodyParser              =   require("body-parser"),
    mongoose                =   require("mongoose"),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    passportLocalMongoose   =   require("passport-local-mongoose"),
    ejs                     =   require("ejs"),
    methodOverride          =   require("method-override"),
    Company                 =   require("./models/company"),
    Student                 =   require("./models/students"),
    User                    =   require("./models/user");
    
    var fs = require('fs');
    
mongoose.connect("mongodb://stacksapien:stacksapien@ds233739.mlab.com:33739/e_cell_chitkara_university");

//mongoose.connect("mongodb://localhost/company");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));

//MULTER CONFIG: to get file photos to temp server storage
  const multerConfig = {

    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

      //specify destination
      destination: function(req, file, next){
        next(null, './public/photo-storage');
      },

      //specify the filename to be unique
      filename: function(req, file, next){
        console.log(file);
        //get the file mimetype ie 'application/pdf' split and prefer the second value ie'pdf'
        const ext = file.mimetype.split('/')[1];
        //set the file fieldname to a unique name containing the original name, current datetime and the extension.
        next(null, userLogged + '.'+ext);
      }
    }),
      // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }

        // only permit image mimetypes
        const pdf = file.mimetype.startsWith('application/');
        if(pdf){
          console.log('pdf uploaded');
          next(null, true);
        }else{
          console.log("file not supported")
          //TODO:  A better message response to user on failure.
          return next();
        }
    }
  };



//======================
//PASSPORT CONFIGURATION
//======================

app.use(require("express-session")({
    secret  :   "This is the encoded Key ",
    resave  :   false,
    saveUninitialized   :   false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

app.get("/",function(req,res){
    res.render("index");
});

// ================================
// ======== AUTH ROUTES ===========
// ================================

app.get("/login",function(req, res) {
    res.render("login");
});

// app.post("/login",function(req, res) {
  
//   res.redirect("user/"+req.body.student.username+"/userEdit");
// });

app.get("/signup",function(req, res) {
    res.render("signup");
});

app.post("/signup",function(req, res) {
    console.log(typeof req.body.username);
    var newUser =   new Student({username: req.body.username});
    Student.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
                res.redirect("/login");      
        });
    });
    
    // Student.create(req.body.student,function(err,newStudent){
    //     if(err){
    //         console.log(err);
    //     }
    //     else
    //     {
    //         console.log("DB created");
    //         console.log(newStudent);
    //     }
    // });
    // res.redirect("/login");
});


var userLogged;
app.post("/login",passport.authenticate("local",{
    failureRedirect:"/login"
}),function(req,res){
    userLogged=req.body.username;
    console.log(typeof req.body.username);
    if(req.body.username==1234567890){
        Student.update({username:req.body.username},{
                    isAdmin:true
    },function(err,object){
        if(err){
            console.log(err);
        }
        else
        console.log(object);
    })
    res.redirect("user/admin");    
    }
    else
    {
    res.redirect("user/"+req.body.username+"/userEdit");    
    }
});
//================================
//================================

// ==============================
// ======= ROUTES ===============
// ==============================
app.get("/user/admin",isLoggedIn,function(req, res) {
    res.render("admin");
});

app.post("/user/admin",isLoggedIn,function(req, res) {
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

app.get("/user/admin/adminView",isLoggedIn,function(req, res) {
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

app.get("/user/admin/registeredStudents/",isLoggedIn,function(req, res) {
    //Get all Company From Database
    Student.find({},function(err,allStudent){
        if(err){
            console.log(err);
        }
        else
        {   
            res.render("registeredStudents",{student:allStudent});
        }
    });
});

app.delete("/user/admin/registeredStudents/:id/:rollNo",isLoggedIn,function(req, res) {
    
    Student.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
        console.log(err);    
        }
        else
        {   console.log("Deleted array");
        var path="public/photo-storage/"+req.params.rollNo+".pdf";
             fs.unlink(path, function(error) {
                if (error) {
                throw error;
                            }
                    console.log('Deleted ' + req.params.rollNo + ".pdf");
                                            });
            res.redirect("/user/admin/registeredStudents/");
        }
        
    });
});

app.post("/user/admin/registeredStudents/view/:id",isLoggedIn,function(req, res) {
    
    Student.findById(req.params.id,function(err,selectedStudent){
        if(err){
            console.log(err);
        }
        else
        { console.log(selectedStudent);
            res.render("adminStudentView",{student:selectedStudent});
                }
    });
});





app.delete("/user/admin/adminView/:id",isLoggedIn,function(req, res) {
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

app.get("/user/admin/adminRecruited/:id",isLoggedIn,function(req, res) {
    
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

app.get("/user/:username/userEdit",isLoggedIn,function(req,res){
    if(userLogged==req.params.username){
    Student.find({rollNo:req.params.username}).find(function(err,user){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(user.length);
            console.log(JSON.stringify(user));
    res.render("userInput",{rollno:req.params.username});
        }
    });    
    }
    else
    {
        res.redirect("/logout");
    }
});



app.post("/user/:username/userEdit",isLoggedIn,multer(multerConfig).single('doc'),function(req,res){
    Student.update({username:req.params.username},{
    rollNo          :   req.params.username,    
    firstName       :   req.body.student.firstName,
    midName       :   req.body.student.midName,
    lastName       :   req.body.student.lastName,
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

app.get("/user/:username/userView",isLoggedIn,function(req, res) {
    Student.find({username:req.params.username}).find(function(err,user){
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

app.get('/photo-storage/:id', function (req, res, next) {
    var filePath = "/photo-storage/"; // Or format the path using the `id` rest param
    var fileName = req.params.id+".pdf"; // The default name the browser will use

    res.download(filePath, fileName);    
});

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// ==========================
// ==========================

// Listening the PORT And IP Output 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});