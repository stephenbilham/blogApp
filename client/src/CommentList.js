import React from "react";

const CommentList = ({ comments }) => {
	const renderedComments = comments ? (
		comments.map((comment) => {
			return <li key={comment.id}>{comment.content}</li>;
		})
	) : (
		<div />
	);

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
