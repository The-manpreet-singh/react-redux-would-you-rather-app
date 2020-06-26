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
			<nav>
				<ul>
					<li>
						<NavLink to="/" exact activeClassName="active">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/add" exact activeClassName="active">
							New Question
						</NavLink>
					</li>
					<li>
						<NavLink to="/leaderboard" exact activeClassName="active">
							Leaderboard
						</NavLink>
					</li>
				</ul>
				<span>
					{this.props.authedUser}
					<button onClick={this.logoutHandler}>Logout</button>
				</span>
			</nav>
		);
	}
}

export default connect()(Navbar);
