import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
	render() {
		const { question, author } = this.props;
	
		return (
			<div>
				<h5>id: {question.id}</h5>
				<h5>author: {author.name}</h5>
				<h5>time: {question.timestamp}</h5>
				<h5>OptionOne: {question.optionOne.text}</h5>
				<h5>OptionTwo: {question.optionTwo.text}</h5>
			</div>
		);
	}
}

const mapStateToprops = ({authedUser,questions, users},{id}) => {
	const question = questions[id];
	const author = users[question.author]
	return {
		authedUser,
		question,
		author
	};
};

export default connect(mapStateToprops)(Question);
