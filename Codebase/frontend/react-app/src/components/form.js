import React, { Component } from 'react';
import './form.css';

class form extends Component {
	render() {
		return (
			<div className="form">
				<p id="welcome">Welcome</p>
				<p id="msg-form">We are excited to see you again!</p>
				<form>
					<div class="form-group">
						<label for="email" id="emailTxt">
							EMAIL:
						</label>
						<input
							type="text"
							class="form-control"
							id="email"
							aria-describedby="emailHelp"
						/>
						<small id="emailHelp" class="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>
					<div class="form-group">
						<label for="pwd" id="password">
							PASSWORD:
						</label>
						<input type="password" class="form-control" id="pwd" />
						<small
							id="forgotPwd"
							class="form-text text-muted"
							className="forgot"
						>
							Forgot your password?
						</small>
					</div>
					<button type="submit" class="btn btn-primary">
						Login
					</button>
					<small id="register" class="form-text text-muted">
						Need an account? <span class="rg">Register</span>
					</small>
				</form>
			</div>
		);
	}
}

export default form;
