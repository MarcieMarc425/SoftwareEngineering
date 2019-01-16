import React, { Component } from 'react';
import './dashboard.css';
import Header from '../header/header';
import DashboardSidebar from '../dashboard-sidebar/dashboard-sidebar';
import { Line, Pie } from 'react-chartjs-2';
import Todolistview from './Todolistview';

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Lead Generation',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

const data2 = {
	labels: ['Product1', 'Product2', 'Product3', 'Product4'],
	datasets: [
		{
			data: [30, 13, 21, 36],
			backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A1F7AC'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
		}
	]
};

class DashboardPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	addItem(e) {
		e.preventDefault();
		if (this._inputElement.value !== '') {
			var newItem = {
				text: this._inputElement.value,
				key: Date.now()
			};

			this.setState(prevState => {
				return {
					items: prevState.items.concat(newItem)
				};
			});
		}

		this._inputElement.value = '';
	}

	deleteItem(key) {
		var filteredItems = this.state.items.filter(function(item) {
			return item.key !== key;
		});

		this.setState({
			items: filteredItems
		});
	}

	render() {
		return (
			<div>
				<Header />
				<div className="container-fluid" id="body-dash">
					<div className="row">
						<div className="col-2" id="sidebar">
							<DashboardSidebar />
						</div>
						<div className="col-sm-9">
							<div className="row">
								<h1 id="dashboard_title">Dashboard</h1>
							</div>
							<div className="row" id="fillbox">
								<div
									id="box1-title"
									className="col-sm-11 white-box"
								>
									<h3>Sales Overview</h3>
								</div>
								<div id="box1" className="col-sm-11 white-box">
									<Line
										data={data}
										height={300}
										options={{
											maintainAspectRatio: false
										}}
									/>
								</div>
							</div>
							<div
								className="row justify-content-between"
								id="fillbox"
							>
								<div
									id="box1"
									className="col-sm-6 white-box box-shadow"
								>
									<h3>To Do List</h3>
									<hr />
									<div className="todolist">
										<div className="todoheader">
											<form onSubmit={this.addItem}>
												<input
													ref={a =>
														(this._inputElement = a)
													}
													placeholder="Enter a task"
												/>
												<button
													type="submit"
													class="btn btn-outline-primary"
												>
													add
												</button>
											</form>
											<Todolistview
												entries={this.state.items}
												delete={this.deleteItem}
											/>
										</div>
									</div>
								</div>
								<div
									id="box1"
									className="col-sm-4 white-box box-shadow"
								>
									<Pie
										data={data2}
										height={300}
										options={{
											maintainAspectRatio: false
										}}
									/>
								</div>
								<div className="col-sm-1" />
							</div>
						</div>
						{/*<div className="col-sm-9 ml-5 white-box mt-3 box-shadow">
							<h2 className="mt-3">Dashboard</h2>
							<hr />
							<div>My Company</div>
						</div>
					</div>
					<div className="row mt-3 ml-3">
						<div className="col-sm-7 white-box mt-1 box-shadow">
							<div className="h-250" />
						</div>
						<div className="ml-5 col-sm-4 white-box mt-1 box-shadow">
							<div className="h-250" />
						</div>
					</div>

					<div className="row mt-3 ml-5 mb-5">
						<div className="col-sm-11 white-box mt-1 box-shadow">
							<div className="h-250" />
					</div>*/}
					</div>
				</div>
			</div>
		);
	}
}

export default DashboardPage;
