import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
	render() {
		const { question, author, id } = this.props;

		if (question === null) {
			return <div>Not exists</div>;
		}

		return (
			<div>
				<h5>id: {question.id}</h5>
				<h5>
					<Link to={`/question/${id}`}>{question.id}</Link>
				</h5>
				<h5>author: {author.name}</h5>
				<h5>time: {question.timestamp}</h5>
				<h5>OptionOne: {question.optionOne.text}</h5>
				<h5>OptionTwo: {question.optionTwo.text}</h5>
			</div>
		);
	}
}

const mapStateToProps = ({ authedUser, questions, users }, { id }) => {
	const question = questions[id];
	const author = users[question.author];
	return {
		authedUser,
		question,
		author,
	};
};

export default withRouter(connect(mapStateToProps)(Question));
