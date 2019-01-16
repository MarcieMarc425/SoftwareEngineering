import React, { Component } from 'react';
import './dropdown.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-simple-dropdown';
import { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';

class dropdown extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Dropdown>
				<DropdownTrigger>
					<div className="mouse-pointer">
						<img className="width-50" src={require('./user.png')} />
						<span>Hi, Marc! </span>
						<i className="fa fa-caret-down" />
					</div>
				</DropdownTrigger>
				<DropdownContent>
					<div className="row">
						<div className="col-sm-12 white-box box-shadow mt-2">
							<div className="mouse-pointer">
								<a className="nav-link text-dark" href="">
									<i className="fa fa-user mr-3" /> Account
								</a>
								<a className="nav-link text-dark" href="">
									<i className="fa fa-cog mr-3" /> Settings
								</a>
								<Link to="/">
									<a
										className="nav-link text-dark"
										onClick={() => this.props.logout}
									>
										<i className="fa fa-sign-out-alt mr-3" />
										Sign out
									</a>
								</Link>
							</div>
						</div>
					</div>
				</DropdownContent>
			</Dropdown>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect(
	mapStateToProps,
	{ logout: actions.logout }
)(dropdown);
