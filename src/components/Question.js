import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
	render() {
		const { question, author, id, authedUser, detailed } = this.props;

		if (question === null) {
			return <div>Not exists</div>;
		}

		return (
			<div>
				<h5>{detailed ? <span>{question.id}</span> : <Link to={`/question/${id}`}>{question.id}</Link>}</h5>
				<h5>author: {author.name}</h5>
				<h5>time: {question.timestamp}</h5>
				{question.optionOne.votes.filter((v) => v === authedUser).length ||
				question.optionTwo.votes.filter((v) => v === authedUser).length ? (
					<span>
						Selected:
						{question.optionOne.votes.filter((v) => v === authedUser).length
							? question.optionOne.text
							: question.optionTwo.text}
					</span>
				) : (
					<span>
						{detailed ? (
							<form>
								<input type="radio" name="gender" id="optionone" value="male" />
								<label htmlFor="optionone">{question.optionOne.text}</label>
								<input type="radio" name="gender" id="optiontwo" value="female" />
								<label htmlFor="optiontwo">{question.optionTwo.text}</label>
								<button type="submit">Submit</button>
							</form>
						) : null}
					</span>
				)}
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
