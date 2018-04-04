var mongoose    =   require("mongoose");
var passportLocalMongoose   =   require("passport-local-mongoose");

var studentSchema = new mongoose.Schema({
    username:   { type: Number},
    rollNo  :   {type:Number},
    password:   { type: String},
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

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student",studentSchema);