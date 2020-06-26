import React, { Component } from "react";

import { connect } from "react-redux";

import { handleInitialData } from "../actions/shared";

import Dashboard from "./Dashboard";

import Signin from "./Signin";

import LoadingBar from "react-redux-loading";

import NewQuestion from "./NewQuestion";

import QuestionDetails from "./QuestionDetails";

import Navbar from "./Navbar";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<LoadingBar />
				
				</div>
				{this.props.loading === false ? (
					<Signin />
				) : (
						<div>
						<Navbar authedUser={this.props.authedUser} />
						<Route path="/" exact component={Dashboard} />
						<Route path="/questions/:id" component={QuestionDetails} />
						<Route path="/add" component={NewQuestion} />
					</div>
				)}
			</BrowserRouter>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		loading: authedUser === null,
		authedUser,
	};
}

export default connect(mapStateToProps)(App);
