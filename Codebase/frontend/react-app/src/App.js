import React, { Component } from 'react';
import './App.css';
import Form from './components/form';

class App extends Component {
	render() {
		return (
			<div class="container h-100">
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
						<Form />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
