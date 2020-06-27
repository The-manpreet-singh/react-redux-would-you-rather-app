import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";
import { Link, withRouter } from "react-router-dom";
import Error from "./Error";
import { Card, Image, Feed, Button } from "semantic-ui-react";

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
				<Card style={{ margin: "20px auto", width: "90%" }}>
					<Card.Content>
						<Card.Header> {author.name} asks:</Card.Header>
					</Card.Content>
					<Card.Content>
						<Feed>
							<Feed.Event>
								<Feed.Label
									style={{ margin: "5px auto", width: "20%" }}
									image={author.avatarURL}
									className="select-avatar"
								/>
								<Feed.Content style={{ margin: "10px 15px" }}>
									<Feed.Date style={{ padding: "3px" }}>
										time: {new Date(question.timestamp).toLocaleDateString()}
									</Feed.Date>

									<Feed.Summary style={{ padding: "3px" }}>
										{detailed ? (
											<span>
												Would you rather
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
											</span>
										) : (
											<Feed.Summary>
												Would you rather...
												<br /> <b>...be a {question.optionOne.text}</b> <br />
												<Link to={`/questions/${id}`}>
													<Button color="purple" style={{ marginTop: "10px" }}>
														View Poll
													</Button>
												</Link>
											</Feed.Summary>
										)}
									</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
						</Feed>
					</Card.Content>
				</Card>
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
