const express = require("express");
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

const mongoose = require("mongoose");

const BASE_API_URL = "mongodb://127.0.0.1:27017/task-reminder";

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("home");
});

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

app.get("/users", async (req, res) => {
	try {
		let users = await User.find();
		console.log("list of users: " + users);
		res.send(users);
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

app.post("/users", async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();

		console.log("created user: " + newUser);
		res.send(newUser);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error creating user");
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

app.delete("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;

		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(404).send("User not found");
		}

		console.log("Deleted user: ", deletedUser);
		res.send("User deleted successfully: " + deletedUser);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting user");
	}
});

app.put("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const updatedTask = req.body;

		const result = await Task.findByIdAndUpdate(taskId, updatedTask, {
			new: true,
		});

		if (!result) {
			return res.status(404).send("Task not found");
		}

		console.log("Updated task:", result);
		res.send(result);
	} catch (err) {
		console.log(err);
		res.status(500).send("Error updating task");
	}
});

app.put("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const updatedUser = req.body;

		const result = await User.findByIdAndUpdate(userId, updatedUser, {
			new: true,
		});

		if (!result) {
			return res.status(404).send("User not found");
		}

		console.log("Updated user:", result);
		res.send(result);
	} catch (err) {
		console.log(err);
		res.status(500).send("Error updating user");
	}
});

//listen on port x
app.listen(3001, () => {
	console.log("Listening on http://localhost:3001");
});
