import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
	render() {
		return (
			<div>
				<h2>My data</h2>
				<ul>
					{this.props.questionsIds.map((id) => (
						<li key={id}>
							<div>user Id: {id}</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

function mapStateToProps({ questions }) {
	return {
		questionsIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
	};
}

export default connect(mapStateToProps)(Dashboard);
