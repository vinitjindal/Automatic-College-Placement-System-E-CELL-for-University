var mongoose    =   require("mongoose");
var passportLocalMongoose   =   require("passport-local-mongoose");

var studentSchema = new mongoose.Schema({
    username:   { type: Number},
    rollNo  :   {type:Number},
    password:   { type: String},
    firstName:  { type: String, default: "N/A" },
    midName:    { type: String, default: "N/A" },
    lastName:   { type: String, default: "N/A" },
    mobileNo:   { type: String, default: "N/A" }, 
    gender:     { type: String, default: "N/A" },
    dob:        { type: String, default: "N/A" },
    fatherName: { type: String, default: "N/A" },
    mailId:     { type: String, default: "N/A" },
    state:      { type: String, default: "N/A" },
    town:       { type: String, default: "N/A" },
    houseNo:    { type: String, default: "N/A" },
    street:     { type: String, default: "N/A" },
    pinCode:    { type: String, default: "N/A" },
        edu10Name:      { type: String, default: "N/A" },
        edu10Type:      { type: String, default: "N/A" },
        edu10Board:     { type: String, default: "N/A" },
        edu10Stream:    { type: String, default: "N/A" },
        edu10Year:      { type: String, default: "N/A" },
        edu10CgpaObt:           { type: String, default: "N/A" },
        edu10CgpaMax:           { type: String, default: "N/A" },
            edu12Name:              { type: String, default: "N/A" },
            edu12Type:              { type: String, default: "N/A" },
            edu12Board:             { type: String, default: "N/A" },
            edu12Stream:            { type: String, default: "N/A" },
            edu12Year:              { type: String, default: "N/A" },
            edu12CgpaObt:           { type: String, default: "N/A" },
            edu12CgpaMax:           { type: String, default: "N/A" },
                eduGradName:        { type: String, default: "N/A" },
                eduGradType:        { type: String, default: "N/A" },
                eduGradBoard:       { type: String, default: "N/A" },
                eduGradStream:      { type: String, default: "N/A" },
                eduGradYear:        { type: String, default: "N/A" },
                eduGradCgpaObt:      { type: Number, default: 0 },
                eduGradCgpaMax:       { type: Number, default: 0 },
        gitHub:{ type: String, default: "N/A" },
        skillTag:{ type: String, default: "N/A" }
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student",studentSchema);