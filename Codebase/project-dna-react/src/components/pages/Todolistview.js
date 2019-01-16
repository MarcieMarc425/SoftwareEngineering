import React, { Component } from 'react';
import Flip from 'react-flip-move';

class Todolistview extends Component {
	constructor(props) {
		super(props);

		this.createTask = this.createTask.bind(this);
	}

	createTask(item) {
		return (
			<li onClick={() => this.delete(item.key)} key={item.key}>
				{item.text}
			</li>
		);
	}

	delete(key) {
		this.props.delete(key);
	}

	render() {
		var todoEntries = this.props.entries;
		var listItems = todoEntries.map(this.createTask);
		return (
			<ul className="list">
				<Flip duration={250} easing="ease-out">
					{listItems}
				</Flip>
			</ul>
		);
	}
}

export default Todolistview;
