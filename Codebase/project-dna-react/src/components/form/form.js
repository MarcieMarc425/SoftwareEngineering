import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.css';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class form extends Component {
	state = {
		data: {
			email: '',
			password: ''
		},
		loading: false,
		errors: {}
	};

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data).catch(err =>
				this.setState({
					errors: err.response.data.errors,
					loading: false
				})
			);
		}
	};

	validate = data => {
		const errors = {};
		if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
		if (!data.password) errors.password = "Can't be blank";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<div className="form" onSubmit={this.onSubmit} loading={loading}>
				<p id="welcome">Welcome</p>
				<p id="msg-form">We are excited to see you again!</p>
				{errors.global && (
					<div class="alert alert-danger" role="alert">
						Something went wrong!
						<p>{errors.global}</p>
					</div>
				)}
				<form>
					<div class="form-group" error={!!errors.email}>
						<label htmlFor="email" id="emailTxt">
							EMAIL:
						</label>
						<input
							type="text"
							class="form-control"
							id="email"
							name="email"
							placeholder="example@example.com"
							aria-describedby="emailHelp"
							value={data.email}
							onChange={this.onChange}
						/>
						<small id="emailHelp" class="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
						{errors.email && <InlineError text={errors.email} />}
					</div>
					<div class="form-group" error={!!errors.password}>
						<label htmlFor="pwd" id="password">
							PASSWORD:
						</label>
						<input
							type="password"
							class="form-control"
							id="pwd"
							name="password"
							value={data.password}
							onChange={this.onChange}
						/>
						<small
							id="forgotPwd"
							class="form-text text-muted"
							className="forgot"
						>
							Forgot your password?
						</small>
						{errors.password && (
							<InlineError text={errors.password} />
						)}
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

form.propTypes = {
	submit: PropTypes.func.isRequired
};

export default form;
