const express = require("express");
const app = express();

const mongoose = require("mongoose");

const BASE_API_URL = "mongodb://127.0.0.1:27017/group-project";

//db
mongoose
	.connect(BASE_API_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

//schemas
const productSchema = new mongoose.Schema({
	name: String,
	age: Number,
});

const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
	email: String,
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);
