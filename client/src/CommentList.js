import React from "react";

const CommentList = ({ comments }) => {
	const getContentForComment = (comment) => {
		switch (comment.status) {
			case "approved":
				return comment.content;
			case "rejected":
				return "This comment has been rejected";
			default:
				return "This comment is pending";
		}
	};

	const renderedComments = comments ? (
		comments.map((comment) => (
			<li key={comment.id}>{getContentForComment(comment)}</li>
		))
	) : (
		<div />
	);

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
