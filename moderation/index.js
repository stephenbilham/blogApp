const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const posts = {};

// get endpoint
app.get("/posts", (req, res) => {
	res.send(posts);
});

// post endpoint
app.post("/events", async (req, res) => {
	const { type, data } = req.body;
	if (type === "CommentCreated") {
		const status = data.content.includes("orange") ? "rejected" : "approved";

		await axios.post("http://localhost:4005/events", {
			type: "CommentModerated",
			data: {
				...data,
				status,
			},
		});
	}

	res.send({});
});

app.listen(4003, () => {
	console.log("listening on port 4003");
});
