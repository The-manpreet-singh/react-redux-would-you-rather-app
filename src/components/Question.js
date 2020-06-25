import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
	state = {
		selected: "",
	};

	optionSelectHandler = (value) => {
		this.setState(() => ({
			selected: value,
		}));
	};

	submitHandler = (event) => {
		event.preventDefault();
		const { selected } = this.state;
		const { dispatch, id } = this.props;

		dispatch(handleAddQuestionAnswer(id, selected));
	};
	render() {
		const { authedUserDetails, question, author, id, authedUser, detailed } = this.props;

		if (question === null) {
			return <div>Not exists</div>;
		}

		return (
			<div>
				<h5>{detailed ? <span>{question.id}</span> : <Link to={`/question/${id}`}>{question.id}</Link>}</h5>
				<h5>author: {author.name}</h5>
				<h5>time: {question.timestamp}</h5>
				{authedUserDetails.answers[question.id] ? (
					<span>
						Selected:
						{question.optionOne.votes.filter((v) => v === authedUser).length
							? question.optionOne.text
							: question.optionTwo.text}
						{question[authedUserDetails.answers[question.id]].text}
					</span>
				) : (
					<span>
						{detailed ? (
							<form onSubmit={this.handleSubmit}>
								<input
									type="radio"
									name="gender"
									id="optionone"
									value="optionOne"
									onChange={(e) => this.optionSelectHandler(e.currentTarget.value)}
								/>
								<label htmlFor="optionone">{question.optionOne.text}</label>
								<input
									type="radio"
									name="gender"
									id="optiontwo"
									value="optionTwo"
									onChange={(e) => this.optionSelectHandler(e.currentTarget.value)}
								/>
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
	const authedUserDetails = users[authedUser];
	const author = users[question.author];
	return {
		authedUser,
		question,
		author,
		authedUserDetails,
	};
};

export default withRouter(connect(mapStateToProps)(Question));
