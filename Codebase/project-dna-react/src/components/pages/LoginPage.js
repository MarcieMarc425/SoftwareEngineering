import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Login.css";
import Form from "../form/form";
import { login } from "../../actions/auth";

class LoginPage extends Component {
	submit = data =>
		this.props
			.login(data)
			.then(() => this.props.history.push("/dashboard"));

	render() {
		return (
			<div class="container h-100">
				<style>
					{
						"body {	height: 100%;	margin: 0;	background-attachment: fixed;	background-repeat: no-repeat;	background-image: linear-gradient(35deg, #70e0ff, #df9bf7);}"
					}
				</style>

				<div
					class="row h-100 justify-content-center align-items-center"
					className="logo"
				>
					<div class="col">
						<p id="head">DNA</p>
						<p id="msg">Where data drives the message</p>
					</div>
				</div>
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col" className="form-col">
						<Form submit={this.submit} />
					</div>
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect(
	null,
	{ login }
)(LoginPage);
