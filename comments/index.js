const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

// Get comments for a specific post
app.get("/posts/:id/comments", (req, res) => {
	const postId = req.params.id;
	res.send(commentsByPostId[postId]);
});

// Post a new comment for a specific post
app.post("/posts/:id/comments", async (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;
	const status = "pending";

	const comments = commentsByPostId[req.params.id] || [];
	comments.push({ id: commentId, content, status });
	commentsByPostId[req.params.id] = comments;

	try {
		await axios.post("http://localhost:4005/events", {
			type: "CommentCreated",
			data: {
				id: commentId,
				content,
				status,
				postId: req.params.id,
			},
		});

		res.status(201).send(comments);
	} catch (error) {
		console.error("Error sending event:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
});

app.post("/events", async (req, res) => {
	const { type, data } = req.body;

	if (type === "CommentModerated") {
		const { id, postId, status } = data;
		const comments = commentsByPostId[postId];
		const comment = comments.find((comment) => comment.id === id);
		comment.status = status;

		await axios.post("http://localhost:4005/events", {
			type: "CommentUpdated",
			data: {
				...data,
			},
		});
	}

	res.send({});
});

// Your server port
const PORT = 4001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
