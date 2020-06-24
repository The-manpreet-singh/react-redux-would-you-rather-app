import React, { Component } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Question from './Question'

class Dashboard extends Component {
	state = {
		data: 0,
	};

	changeHandler = (e, data) => {
		this.setState({ data });
	};

	render() {
		const { data } = this.state;

		//console.log(data);
		return (
			<div>
				<AppBar position="static">
					<Toolbar>Dashboard</Toolbar>
				</AppBar>

				<Tabs
					value={data}
					onChange={this.changeHandler}
					indicatorColor="primary"
					textColor="primary"
					centered
					aria-label="full width tabs example"
				>
					<Tab label="Unanswared Questions" />
					<Tab label="Answared Questions" />
				</Tabs>

				{data === 0 && (
					<ul>
						{this.props.unansweredQuestionIds.map((id) => (
							<li key={id}> <Question id={id} /> </li>
						))}
					</ul>
				)}
				{data === 1 && (
					<ul>
						{this.props.answeredQuestionIds.map((id) => (
							<li key={id}><Question id={id} /></li>
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
