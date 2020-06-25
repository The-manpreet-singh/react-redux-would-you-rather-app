import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionDetails extends Component {
	render() {
		const { id } = this.props;
		return (
			<div>
				<Question id={id} />
			</div>
		);
	}
}

function mapStateToProps(props) {
	const { id } = props.match.params;

	return {
		id,
	};
}

export default connect(mapStateToProps)(QuestionDetails);
