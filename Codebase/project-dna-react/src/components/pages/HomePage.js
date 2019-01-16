import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import './homepage.css';

const HomePage = ({ isAuthenticated, logout }) => (
	<div className="hero">
		<div className="hero-inner">
			<style>{'body { background-color: white; }'}</style>
			<h1>Project DNA</h1>
			<p>Where data drives the message.</p>
			{isAuthenticated ? (
				<button onClick={() => logout()} class="btn btn-outline-danger">
					Logout
				</button>
			) : (
				<Link id="login_btn" to="/login">
					Login
				</Link>
			)}
		</div>
		<div className="bodymain" />
	</div>
);

HomePage.prototype = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect(
	mapStateToProps,
	{ logout: actions.logout }
)(HomePage);
