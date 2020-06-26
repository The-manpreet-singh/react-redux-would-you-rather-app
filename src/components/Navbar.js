import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
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
			</ul>
		</nav>
	);
}
