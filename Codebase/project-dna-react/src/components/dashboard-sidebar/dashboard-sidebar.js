import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard-sidebar.css';

class dashboardSidebar extends Component {
	render() {
		return (
			<div className="row" id="side_bar_fixed">
				<div className="col-9 bg-white box-shadow text-center h-350">
					<div className="navbar-light text-center">
						<ul className="navbar-nav w-100 text-center">
							<li>
								<Link to="/dashboard">
									<a className="nav-link mt-2">Overview</a>
								</Link>
							</li>
							<li>
								<Link to="/dashboard/create-project">
									<a className="nav-link">Create Project</a>
								</Link>
							</li>
							<li>
								<a className="nav-link" href="">
									Realtime Analytics
								</a>
							</li>

							<li>
								<a className="nav-link mb-2" href="">
									Apps
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default dashboardSidebar;
