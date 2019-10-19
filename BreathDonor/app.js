var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Donor',{ useNewUrlParser: true , useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

var DonorSchema = new mongoose.Schema({
	name: String,
	userID: String,
	password: String,
	Blood_Grp: String,
	dob: Date,
	Organ_donate: String,
	city: String,
	contact_no: Number
});

var Donor = mongoose.model("Donor",DonorSchema);

app.get("/",function(req,res){
	res.send("Hello!");
});

/*Donor.create({
			name: "lakshya",
			userID: "luck", 
			password: "pass",
			Blood_Grp: "B+ve",
			dob:"14-10-2000"
			Organ_needed: "lungs",	
			city: "jaipur",
			contact_no:1234567890
		},function(err,donor){
		if(err)
			console.log(err);
		else
			console.log(donor);
	});*/

app.get("/donors",function(req,res){
	Donor.find({}, function(err,donor){
	if(err)
		console.log(err);
	else
		res.render("index", {donor: donor});
	});
});

app.get("/donors/new",function(req,res){
		res.render("new");
});

app.post("/donors",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var Blood_Grp = req.body.Blood_Grp;
	var dob = req.body.dob;
	var Organ = req.body.Organ;
	var city = req.body.city;
	var contact_no = req.body.contact_no;
	
	Donor.create({
			name: name,
			userID: userID, 
			password: password,
			Blood_Grp: Blood_Grp,
			dob: dob,
			Organ_needed: Organ,
			city: city,
			contact_no: contact_no
		},function(err,donor){
		if(err)
			console.log(err);
		else
			res.redirect("/donor");
	});
});

app.listen(27017,process.env.IP,function(){
	console.log("The Donor Server Is Started");
});