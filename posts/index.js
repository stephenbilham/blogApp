const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

// get endpoint
app.get("/posts", (req, res) => {
	res.send(posts);
});

// post endpoint
app.post("/posts", async (req, res) => {
	console.log("POST /posts endpoint hit");

	const id = randomBytes(4).toString("hex");
	const { title } = req.body;

	posts[id] = {
		id,
		title,
	};

	try {
		await axios.post("http://localhost:4005/events", {
			type: "postCreated",
			data: {
				id,
				title,
			},
		});
		res.status(201).send(posts[id]);
	} catch (error) {
		console.error("Error sending event:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
});

// post to event bus
app.post("/events", (req, res) => {
	console.log("Event Recieved", req.body.type);

	res.send({});
});

// port
app.listen(4000, () => {
	console.log("listening on port 4000");
});
