const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());

const commentsByPostId = {};

// Get comments for a specific post
app.get("/posts/:id/comments", (req, res) => {
	const postId = req.params.id;
	res.send(commentsByPostId[postId]);
});

// Post a new comment for a specific post
app.post("/posts/:id/comments", (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content });

	commentsByPostId[req.params.id] = comments;

	res.status(201).send(comments);
});

// Your server port
const PORT = 4001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
