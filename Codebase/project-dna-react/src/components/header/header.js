import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from '../dropdown/dropdown';
import './header.css';

export default class header extends Component {
	render() {
		return (
			<div className="container-fluid" id="fullHead">
				<div className="row" id="header">
					<div className="col-sm-12">
						<nav className="navbar navbar-expand-md navbar-dark">
							<div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2" />

							<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
								<ul className="navbar-nav ml-auto">
									<li className="p-3">
										<Dropdown />
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}
