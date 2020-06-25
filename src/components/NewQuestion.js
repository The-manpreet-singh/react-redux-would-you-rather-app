import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
	};

	changehandler = (event, option) => {
		const input = e.target.value;

		this.setState(() => ({
			[option]: input,
		}));
	};

	submitHandler = (event) => {
		event.preventDefault();
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		dispatch(handleAddQuestion(optionOne, optionTwo));

		this.setState(() => ({
			optionOne,
			optionTwo,
		}));
	};

	render() {
		const { optionOne, optionTwo } = this.state;

		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<input type="text" onChange={(e) => this.handleChange("optionOne", e)} defaultValue={optionOne} />
					<input type="text" onChange={(e) => this.handleChange("optionTwo", e)} defaultValue={optionTwo} />
					<button type="submit">ADD</button>
				</form>
			</div>
		);
	}
}

export default connect(NewQuestion);
