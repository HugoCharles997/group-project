const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

const BASE_API_URL = "mongodb://127.0.0.1:27017/task-reminder";

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

const Task = mongoose.model("Task", task);
const User = mongoose.model("User", user);

//methodes get et post

app.get("/tasks", async (req, res) => {
	try {
		let tasks = await Task.find();
		console.log("list of tasks: " + tasks);
		res.send(tasks);
	} catch (error) {
		console.log(error);
	}
});

app.post("/tasks", async (req, res) => {
	try {
		const newTask = new Task(req.body);
		await newTask.save();

		console.log("created task: " + newTask);
		res.send(newTask);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error creating task");
	}
});

app.delete("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;

		const deletedTask = await Task.findByIdAndDelete(taskId);

		if (!deletedTask) {
			return res.status(404).send("Task not found");
		}

		console.log("Deleted task: ", deletedTask);
		res.send("Task deleted successfully: " + deletedTask);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting task");
	}
});

//middleware

//listen on port x
app.listen(3001, () => {
	console.log("Listening on  http://localhost:3001");
});
