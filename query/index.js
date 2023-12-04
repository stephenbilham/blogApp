const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
	//
});

app.get("/events", (req, res) => {
	const { type, data } = req.body;

	if (type === "postCreated") {
		//
	}
	if (type === "commentCreated") {
		//
	}
});

const PORT = 4002;

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
