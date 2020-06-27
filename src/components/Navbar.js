import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Navbar extends Component {
	logoutHandler = () => {
		const { dispatch } = this.props;
		dispatch(setAuthedUser(null));
	};
	render() {
		return (
			<div className="ui pointing secondary menu" style={{ width: "90%", margin: "20px auto" }}>
				<NavLink to="/" className="item" exact>
					Home
				</NavLink>

				<NavLink to="/add" className="item" exact>
					New Question
				</NavLink>

				<NavLink to="/leaderboard" className="item" exact>
					Leaderboard
				</NavLink>

				<div className="right menu">
					<span className="item">{this.props.authedUser}</span>
					<button className="ui red button" onClick={this.logoutHandler}>
						Logout
					</button>
				</div>
			</div>
		);
	}
}

export default connect()(Navbar);
