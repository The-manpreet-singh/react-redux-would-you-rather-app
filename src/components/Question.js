import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";
import { Link, withRouter } from "react-router-dom";
import Error from "./Error";

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
		const { authedUserDetails, question, author, id, detailed } = this.props;

		if (question === null) {
			return <Error />;
		}

		return (
			<div>
				<h5>
					{detailed ? (
						<span>
							Would you rather <b>{question.optionOne.text}</b> or <b>{question.optionTwo.text}</b>
						</span>
					) : (
						<Link to={`/questions/${id}`} style={{ textDecoration: "none" }}>
							Would you rather <b>{question.optionOne.text}</b> or <b>{question.optionTwo.text}</b>
						</Link>
					)}
				</h5>
				<h5>author: {author.name}</h5>
				<h5>time: {new Date(question.timestamp).toLocaleDateString()}</h5>
				{authedUserDetails.answers[question.id] ? (
					<div>
						Selected:
						{question[authedUserDetails.answers[question.id]].text}
						{detailed && (
							<div>
								Results:
								{question.optionOne.text}
								<ul>
									<li>Votes: {question.optionOne.votes.length}</li>
									<li>
										Percentage:
										{(question.optionOne.votes.length /
											(question.optionOne.votes.length + question.optionTwo.votes.length)) *
											100}
										%
									</li>
								</ul>
								{question.optionTwo.text}
								<ul>
									<li>Votes: {question.optionTwo.votes.length}</li>
									<li>
										Percentage:
										{(question.optionTwo.votes.length /
											(question.optionOne.votes.length + question.optionTwo.votes.length)) *
											100}
										%
									</li>
								</ul>
							</div>
						)}
					</div>
				) : (
					<span>
						{detailed ? (
							<form onSubmit={this.submitHandler}>
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
	const author = questions[id] ? users[questions[id].author] : "";
	return {
		question,
		author,
		authedUserDetails,
	};
};

export default withRouter(connect(mapStateToProps)(Question));
