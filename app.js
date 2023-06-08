const express = require("express");
const app = express();

const mongoose = require("mongoose");

const BASE_API_URL = "mongodb://127.0.0.1:27017/group-project";

//connexion à la db
mongoose
	.connect(BASE_API_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

//////

//creation des schemas et collections
const task = new mongoose.Schema({
	title: String,
	description: String,
	attribuateTo: String,
	status: Boolean,
	endDate: Date,
	creationDate: Date,
	age: Number,
});

const user = new mongoose.Schema({
	name: String,
	age: Number,
	email: String,
});

const Tasks = mongoose.model("Product", task);
const User = mongoose.model("User", user);

//methodes get et post

app.get("/tasks", async (req, res) => {
	try {
		let products = await Tasks.find();
		console.log("list of tasks: " + products);
		res.send(products);
	} catch (error) {
		console.log(error);
	}
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listen on port x
app.listen(3001, () => {
	console.log("Listening on  http://localhost:3000");
});
