import React, { Component } from 'react';
import './dashboard.css';
import Header from '../header/header';
import DashboardSidebar from '../dashboard-sidebar/dashboard-sidebar';
import axios, { post } from 'axios';
import { AgGridReact } from 'ag-grid-react';
import {
	Form,
	FormGroup,
	Container,
	Col,
	Alert,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Select from '../create-project/select';
import SingleInput from '../create-project/single_input.js';
import CheckboxOrRadioGroup from '../create-project/checkbox_or_radio_group';
import SVM from 'ml-svm';
var _ = require('lodash');

class CreateProjectPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputInProcess: true,
			file: '',
			uploaded: false,
			processed: false,
			columnDefs: [],
			rowData: [],
			modal: false,
			modal2: false,
			modal3: false,
			modal4: false,
			predictoutcome: 0,
			categoryOptions1: [
				'Linear Regression',
				'Multivariate Linear Regression',
				'SVM Classification'
			],
			categorySelection1: '',
			categoryOptions2: [],
			categorySelection2: '',
			categoryOptions3: [],
			categorySelection3: '',
			algoChosen: false,
			dataSize: 0,
			inputSize: 0,
			outputSize: 0,
			outcomePredicted: false,
			checkBoxSelections0: [],
			selectedCheckBoxes0: [],
			checkBoxSelections1: [],
			selectedCheckBoxes1: [],
			xList: [],
			yList: [],
			algoProcessed: false,
			accuracy: 0,
			model: {},
			modelText: '',
			predictInput: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
		this.processFile = this.processFile.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.toggle3 = this.toggle3.bind(this);
		this.toggle4 = this.toggle4.bind(this);
		this.handleCategorySelect1 = this.handleCategorySelect1.bind(this);
		this.handleCategorySelect2 = this.handleCategorySelect2.bind(this);
		this.handleCategorySelect3 = this.handleCategorySelect3.bind(this);
		this.handleModalSubmit = this.handleModalSubmit.bind(this);
		this.handleModalSubmit2 = this.handleModalSubmit2.bind(this);
		this.handleAlgo = this.handleAlgo.bind(this);
		this.handleCheckBoxSelection0 = this.handleCheckBoxSelection0.bind(
			this
		);
		this.handleCheckBoxSelection1 = this.handleCheckBoxSelection1.bind(
			this
		);
		this.processAlgo = this.processAlgo.bind(this);
		this.handleTextInputChange = this.handleTextInputChange.bind(this);
		this.handlePrediction = this.handlePrediction.bind(this);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.fileUpload(this.state.file).then(response => {
			if (response.data.status === 'success') {
				// Render processing
				this.setState({ uploaded: true });
				console.log(response.data.file);
				console.log(this.state.file.name);
			}
		});
	};

	onChange = e => {
		this.setState({ file: e.target.files[0] });
	};

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	toggle2() {
		this.setState({
			modal2: !this.state.modal2
		});
	}

	toggle3() {
		this.setState({
			modal3: !this.state.modal3
		});
	}

	toggle4() {
		this.setState({
			modal4: !this.state.modal4
		});
	}

	fileUpload = file => {
		const url = 'http://localhost:8080/upload';
		const formData = new FormData();
		formData.append('file', file, file.name);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		return post(url, formData, config);
	};

	processFile = () => {
		const url = `${this.state.file.name}`;
		post('http://localhost:8080/process', {
			url: url
		}).then(res => {
			this.setState({
				columnDefs: res.data.columnDefs,
				rowData: res.data.rowData,
				categoryOptions2: res.data.key,
				categoryOptions3: res.data.key,
				processed: true,
				dataSize: res.data.size
			});
		});
	};

	handleCategorySelect1(e) {
		this.setState({ categorySelection1: e.target.value });
	}
	handleCategorySelect2(e) {
		this.setState({ categorySelection2: e.target.value });
	}
	handleCategorySelect3(e) {
		this.setState({ categorySelection3: e.target.value });
	}

	handleCheckBoxSelection0(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if (this.state.selectedCheckBoxes0.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedCheckBoxes0.filter(
				s => s !== newSelection
			);
		} else {
			newSelectionArray = [
				...this.state.selectedCheckBoxes0,
				newSelection
			];
		}
		this.setState({ selectedCheckBoxes0: newSelectionArray });
	}
	handleCheckBoxSelection1(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if (this.state.selectedCheckBoxes1.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedCheckBoxes1.filter(
				s => s !== newSelection
			);
		} else {
			newSelectionArray = [
				...this.state.selectedCheckBoxes1,
				newSelection
			];
		}
		this.setState({ selectedCheckBoxes1: newSelectionArray });
	}

	handleModalSubmit(e) {
		e.preventDefault();

		const formPayload = {
			categorySelection1: this.state.categorySelection1,
			categorySelection2: this.state.categorySelection2,
			categorySelection3: this.state.categorySelection3
		};

		console.log(
			'In Search/handleFormSubmit. Submitting now. formPayload: ',
			formPayload
		);
		this.toggle();
		this.handleAlgo(
			this.state.categorySelection1,
			this.state.categorySelection2,
			this.state.categorySelection3
		);
	}

	handleModalSubmit2(e) {
		e.preventDefault();

		const formPayload = {
			selectedCheckBoxes0: this.state.selectedCheckBoxes0,
			selectedCheckBoxes1: this.state.selectedCheckBoxes1
		};

		console.log(
			'In Search/handleFormSubmit. Submitting now. formPayload: ',
			formPayload
		);
		this.toggle2();
		this.processAlgo(
			this.state.categorySelection1,
			this.state.categorySelection2,
			this.state.categorySelection3
		);
	}

	handleAlgo = (algo, input, output) => {
		if (algo === 'SVM Classification') {
			var newArr = [];
			var inputList = [];
			var outputList = [];
			var count = 0;
			_.forIn(this.state.rowData, (value, key) => {
				var arr = _.pick(value, [input, output]);
				if (_.get(arr, input) !== '' && _.get(arr, output) !== '') {
					newArr.push(_.pick(value, [input, output]));
					inputList.push(_.get(arr, input));
					outputList.push(_.get(arr, output));
					count++;
				}
			});

			inputList = _.uniq(inputList);
			outputList = _.uniq(outputList);
			console.log(outputList);

			this.setState({
				columnDefs: [
					{ headerName: input, field: input },
					{ headerName: output, field: output }
				],
				rowData: newArr,
				dataSize: count,
				inputSize: inputList.length,
				outputSize: outputList.length,
				checkBoxSelections0: outputList,
				checkBoxSelections1: outputList,
				xList: inputList,
				yList: outputList,
				algoProcessed: true
			});

			this.setState({
				modal2: true
			});
		}
	};

	handleTextInputChange(e) {
		this.setState({ inputInProcess: true });
		this.setState({ predictInput: e.target.value }, () => {});
	}

	handlePrediction(e) {
		e.preventDefault();

		var featureNum = -1;
		for (var i = 0; i < this.state.xList.length; i++) {
			if (this.state.predictInput === this.state.xList[i]) {
				featureNum = i;
			}
		}
		var importedSvm = SVM.load(this.state.model);
		var predictOutcome = importedSvm.predict(featureNum);
		this.setState({
			predictoutcome: predictOutcome,
			outcomePredicted: true
		});
	}

	processAlgo(algo, input, output) {
		if (algo === 'SVM Classification') {
			var xVar = [];
			var yVar = [];
			var yVar2 = [];
			_.forIn(this.state.rowData, (value, key) => {
				var arr = _.pick(value, [input, output]);
				xVar.push([_.indexOf(this.state.xList, _.get(arr, input))]);
				yVar2.push(_.indexOf(this.state.yList, _.get(arr, output)));
				if (
					_.indexOf(
						this.state.selectedCheckBoxes0,
						_.get(arr, output)
					) !== -1
				) {
					yVar.push(-1);
				} else {
					yVar.push(1);
				}
			});

			var options = {
				C: 1,
				tol: 10e-4,
				maxPasses: 10,
				maxIterations: 10000,
				kernel: 'rbf',
				kernelOptions: {
					sigma: 0.5
				}
			};
			var svm = new SVM(options);

			var features = xVar;
			var labels = yVar;
			console.log(features);
			console.log(labels);

			svm.train(features, labels);
			var prediction = svm.predict(features);
			var correctCount = 0;
			for (var i = 0; i < yVar.length; i++) {
				if (prediction[i] == yVar[i]) correctCount++;
			}
			var accuracy = correctCount / yVar.length;
			var model = svm.toJSON();
			var modelText = JSON.stringify(svm.toJSON());
			this.setState({
				algoProcessed: true,
				accuracy: accuracy,
				model: model,
				modelText: modelText
			});
		}
	}

	render() {
		const uploaded = this.state.uploaded;
		const processed = this.state.processed;
		const algoProcessed = this.state.algoProcessed;
		const outcomePredicted = this.state.outcomePredicted;

		let testingText;
		if (uploaded) {
			testingText = (
				<div>
					<p>You have successfully imported the file.</p>
					<button
						type="button"
						class="btn btn-primary"
						onClick={this.processFile}
					>
						Process file
					</button>
				</div>
			);
		}

		let testingTable;
		if (processed) {
			testingTable = (
				<div
					className="ag-theme-balham"
					style={{
						height: '500px',
						width: '100%'
					}}
				>
					<AgGridReact
						enableSorting={true}
						enableFilter={true}
						columnDefs={this.state.columnDefs}
						rowData={this.state.rowData}
					/>
					<p>The size of data is: {this.state.dataSize} rows</p>
					<button
						type="button"
						class="btn btn-primary"
						onClick={this.toggle}
					>
						Analyze
					</button>
				</div>
			);
		}

		let testingAlgo;
		if (algoProcessed) {
			testingAlgo = (
				<div>
					<div id="box2" className="col-sm-11 white-box">
						Model accuracy is {this.state.accuracy}
						<button color="primary" onClick={this.toggle3}>
							Make prediction
						</button>
						<button color="secondary" onClick={this.toggle4}>
							Export model
						</button>
					</div>
				</div>
			);
		}

		let outcome;
		if (outcomePredicted) {
			outcome = <div>{this.state.predictoutcome}</div>;
		}

		const colWidth = { xl: '6', md: '8', sm: '10', xs: '12' };

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
								<h1 id="dashboard_title">Create New Project</h1>
							</div>
							<div className="row" id="fillbox">
								<div id="box1" className="col-sm-11 white-box">
									<form onSubmit={this.handleSubmit}>
										<div class="form-group">
											<label for="exampleFile">
												Import CSV file
											</label>
											<input
												type="file"
												class="exampleFile"
												id="exampleFile"
												onChange={this.onChange}
											/>
										</div>
										<div class="form-group">
											<button
												type="submit"
												class="btn btn-primary"
											>
												Upload
											</button>
										</div>
									</form>
									{testingText}
									{testingTable}
									<Modal
										isOpen={this.state.modal}
										toggle={this.toggle}
										className={this.props.className}
									>
										<ModalHeader toggle={this.toggle}>
											Machine Learing Algorithm
										</ModalHeader>
										<ModalBody>
											<Form
												onSubmit={
													this.handleModalSubmit
												}
											>
												<Select
													name={'Algorithm'}
													placeholder={
														'Choose algorithm'
													}
													required={true}
													controlFunc={
														this
															.handleCategorySelect1
													}
													options={
														this.state
															.categoryOptions1
													}
													selectedOption={
														this.state
															.categorySelection1
													}
													colWidth={colWidth}
												/>
												<Select
													name={'Input parameter'}
													placeholder={'Choose input'}
													required={true}
													controlFunc={
														this
															.handleCategorySelect2
													}
													options={
														this.state
															.categoryOptions2
													}
													selectedOption={
														this.state
															.categorySelection2
													}
													colWidth={colWidth}
												/>
												<Select
													name={'Output parameter'}
													placeholder={
														'Choose output'
													}
													required={true}
													controlFunc={
														this
															.handleCategorySelect3
													}
													options={
														this.state
															.categoryOptions3
													}
													selectedOption={
														this.state
															.categorySelection3
													}
													colWidth={colWidth}
												/>
												<Button
													type="submit"
													color="primary"
												>
													Submit
												</Button>
											</Form>
										</ModalBody>
										<ModalFooter>
											<Button
												color="secondary"
												onClick={this.toggle}
											>
												Cancel
											</Button>
										</ModalFooter>
									</Modal>
									<Modal
										isOpen={this.state.modal2}
										toggle={this.toggle2}
										className={this.props.className}
									>
										<ModalHeader toggle={this.toggle2}>
											Specify output variables
										</ModalHeader>
										<ModalBody>
											<Form
												onSubmit={
													this.handleModalSubmit2
												}
											>
												<CheckboxOrRadioGroup
													title={'Outcome = -1'}
													setName={'checkbox'}
													type={'checkbox'}
													controlFunc={
														this
															.handleCheckBoxSelection0
													}
													options={
														this.state
															.checkBoxSelections0
													}
													selectedOptions={
														this.state
															.selectedCheckBoxes0
													}
													inline={true}
													colWidth={colWidth}
												/>
												<CheckboxOrRadioGroup
													title={'Outcome = 1'}
													setName={'checkbox'}
													type={'checkbox'}
													controlFunc={
														this
															.handleCheckBoxSelection1
													}
													options={
														this.state
															.checkBoxSelections1
													}
													selectedOptions={
														this.state
															.selectedCheckBoxes1
													}
													inline={true}
													colWidth={colWidth}
												/>

												<Button
													type="submit"
													color="primary"
												>
													Submit
												</Button>
											</Form>
										</ModalBody>
										<ModalFooter>
											<Button
												color="secondary"
												onClick={this.toggle2}
											>
												Cancel
											</Button>
										</ModalFooter>
									</Modal>
									<Modal
										isOpen={this.state.modal3}
										toggle={this.toggle3}
										className={this.props.className}
									>
										<ModalHeader toggle={this.toggle3}>
											Prediction
										</ModalHeader>
										<ModalBody>
											<Form
												onSubmit={this.handlePrediction}
											>
												<SingleInput
													inputType={'text'}
													title={'Input variable:'}
													name={'textInput'}
													changeFunc={
														this
															.handleTextInputChange
													}
													content={
														this.state.predictInput
													}
													placeholder={''}
													feedback={
														'Text input is required!'
													}
													colWidth={colWidth}
												/>
												<button
													type="submit"
													color="priamry"
												>
													Submit
												</button>
											</Form>
											{outcome}
										</ModalBody>
										<ModalFooter>
											<Button
												color="secondary"
												onClick={this.toggle3}
											>
												Exit
											</Button>
										</ModalFooter>
									</Modal>
									<Modal
										isOpen={this.state.modal4}
										toggle={this.toggle4}
										className={this.props.className}
									>
										<ModalHeader toggle={this.toggle4}>
											Model JSON
										</ModalHeader>
										<ModalBody>
											{this.state.modelText}
										</ModalBody>
										<ModalFooter>
											<Button
												color="secondary"
												onClick={this.toggle4}
											>
												Exit
											</Button>
										</ModalFooter>
									</Modal>
								</div>
								{testingAlgo}
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

export default CreateProjectPage;
