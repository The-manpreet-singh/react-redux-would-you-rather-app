import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionDetails extends Component {
	render() {
		const { id } = this.props;
		return (
			<div>
				<Question id={this.props.match.id} detailed />
			</div>
		);
	}
}

export default connect()(QuestionDetails);
