import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
	state = {
		data: false,
	};

	changeHandler = (e, data) => {
		this.setState({ data });
	};

	render() {
		const { data } = this.state;
		console.log(data);
		return (
			<div>
				<h2>My data</h2>
				{data === false && (
					<ul>
						{this.props.unansweredQuestionIds.map((id) => (
							<li key={id}>{id}</li>
						))}
					</ul>
				)}
				{data === true && (
					<ul>
						{this.props.answeredQuestionIds.map((id) => (
							<li key={id}>{id}</li>
						))}
					</ul>
				)}
			</div>
		);
	}
}

function mapStateToProps({ questions, authedUser }) {
	return {
		// questionsIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
		answeredQuestionIds: Object.keys(questions).filter(
			(q) =>
				questions[q].optionOne.votes.some((c) => c === authedUser) ||
				questions[q].optionTwo.votes.some((c) => c === authedUser)
		),
		unansweredQuestionIds: Object.keys(questions).filter(
			(q) =>
				!(
					questions[q].optionOne.votes.some((c) => c === authedUser) ||
					questions[q].optionTwo.votes.some((c) => c === authedUser)
				)
		),
	};
}

export default connect(mapStateToProps)(Dashboard);
