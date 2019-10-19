var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Recipient',{ useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

var RecipientSchema = new mongoose.Schema({
	name: String,
	userID: String,
	password: String,
	Blood_Grp: String,
	Organ_needed: String,
	city: String
});

var Recipient = mongoose.model("Recipient",RecipientSchema);

app.get("/",function(req,res){
	res.send("Hello!");
});

/*Recipient.create({
			name: "lakshya",
			userID: "luck", 
			password: "pass",
			Blood_Grp: "B+ve",
			Organ_needed: "lungs",	
			city: "jaipur"
		},function(err,recipient){
		if(err)
			console.log(err);
		else
			console.log(recipient);
	});*/

app.get("/recipients",function(req,res){
	Recipient.find({}, function(err,recipients){
	if(err)
		console.log(err);
	else
		res.render("index", {recipients: recipients});
	});
});

app.get("/recipients/new",function(req,res){
		res.render("new");
});

app.post("/recipients",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var Blood_Grp = req.body.Blood_Grp;
	var Organ = req.body.Organ;
	var city = req.body.city;
	
	Recipient.create({
			name: name,
			userID: userID, 
			password: password,
			Blood_Grp: Blood_Grp,
			Organ_needed: Organ,
			city: city
		},function(err,recipient){
		if(err)
			console.log(err);
		else
			res.redirect("/recipients");
	});
});

app.listen(27017,process.env.IP,function(){
	console.log("The Recipients Server Is Started");
});