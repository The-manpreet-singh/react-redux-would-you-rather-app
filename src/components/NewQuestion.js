import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
		home: false,
	};

	changeHandler = (e, option) => {
		const input = e.target.value;

		this.setState(() => ({
			[option]: input,
		}));
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		dispatch(handleAddQuestion(optionOne, optionTwo));

		this.setState(() => ({
			optionOne,
			optionTwo,
			home: true,
		}));
	};

	render() {
		const { optionOne, optionTwo, home } = this.state;

		if (home) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<input type="text" onChange={(e) => this.changeHandler(e, "optionOne")} defaultValue={optionOne} />
					<input type="text" onChange={(e) => this.changeHandler(e, "optionTwo")} defaultValue={optionTwo} />
					<button type="submit">ADD</button>
				</form>
			</div>
		);
	}
}

export default connect()(NewQuestion);
