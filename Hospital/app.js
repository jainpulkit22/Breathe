var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Hospital',{ useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

var HospitalSchema = new mongoose.Schema({
	name: String,
	Reg_ID: String,
	password: String,
	doctor_name: String,
	license_no: Number,
	city: String
});

var Hospital = mongoose.model("Hospital",HospitalSchema);

app.get("/",function(req,res){
	res.send("Hello!");
});

/*Hospital.create({
			name: "lakshya",
			Reg_ID: "AB44554", 
			password: "pass",
			doctor_name: "ram",
			license_no: 19319587,	
			city: "jaipur"
		},function(err,hospital){
		if(err)
			console.log(err);
		else
			console.log(hospital)
	});*/

app.get("/hospitals",function(req,res){
	Hospital.find({}, function(err,hospitals){
	if(err)
		console.log(err);
	else
		res.render("index", {hospitals: hospitals});
	});
});

app.get("/hospitals/new",function(req,res){
		res.render("new.ejs");
});

app.post("/hospitals",function(req,res){
	var name = req.body.name;
	var Reg_ID = req.body.Reg_ID;
	var password = req.body.password;
	var doctor_name = req.body.doctor_name;
	var license_no = req.body.license_no;
	var city = req.body.city;
	
	Hospital.create({
			name: name,
			Reg_ID: Reg_ID, 
			password: password,
			doctor_name: doctor_name,
			license_no: license_no,
			city: city
		},function(err,hospital){
		if(err)
			console.log(err);
		else
			res.redirect("/hospitals");
	});
});

app.listen(27017,process.env.IP,function(){
	console.log("The Hospital Server Is Started");
});