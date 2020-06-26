import React, { Component } from "react";

import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Signin extends Component {
	state = {
		selectedUser: "",
	};

	handleUserSelect = (value) => {
		this.setState(() => ({
			selectedUser: value,
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { dispatch } = this.props;
		dispatch(setAuthedUser(this.state.selectedUser));
	};

	render() {
		const { users } = this.props;

		return (
			<div>
				Sign In page
				<br />
				<select defaultValue="0" onChange={(e) => this.handleUserSelect(e.target.value)}>
					<option value="0" disabled>
						Select User
					</option>
					{users &&
						Object.keys(users).map((user) => (
							<option key={user} value={user}>
								{users[user].name}
							</option>
						))}
				</select>
				<br />
				<button onClick={this.handleSubmit} disabled={!this.state.selectedUser}>
					Login
				</button>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users,
	};
}

export default connect(mapStateToProps)(Signin);
