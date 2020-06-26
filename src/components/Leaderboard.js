import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
	render() {
		const { authedUser,leaderboardData } = this.props;

		return (
			<div>
				Leaderboard component
				{leaderboardData
					? leaderboardData.map((user) => (
							<div key={user.id}>
								{user.name}
								<li>Answered Questions: {user.answeredQuestions}</li>
								<li>Created Questions: {user.createdQuestions}</li>
								<li>Total: {user.answeredQuestions + user.createdQuestions}</li>
								<hr />
							</div>
					  ))
					: null}
			</div>
		);
	}
}

function mapStateToProps({ authedUser, users, questions }) {
	const leaderboardData = Object.keys(users)
    .map((user) => ({
      id: user,
			name: users[user].name,
			avatarURL: users[user].avatarURL,
			answeredQuestions: Object.keys(users[user].answers).length,
			createdQuestions: Object.keys(questions).filter((q) => questions[q].author === user).length,
		}))
		.sort((a, b) => b.answeredQuestions + b.createdQuestions - (a.answeredQuestions + a.createdQuestions));

	return {
		authedUser,
		leaderboardData,
	};
}

export default connect(mapStateToProps)(Leaderboard);
