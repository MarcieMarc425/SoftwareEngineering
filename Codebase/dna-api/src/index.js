import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import promise from 'bluebird';

const fileUpload = require('express-fileupload');
const cors = require('cors');
const csv = require('csvtojson');
const _ = require('underscore');

import auth from './routes/auth';

dotenv.config();
const PORT = 8080;
const app = express();
app.use(fileUpload());
app.use(cors());

app.use(bodyParser.json());
mongoose.Promise = promise;
mongoose.connect(
	process.env.MONGODB_URL,
	{ useMongoClient: true }
);

app.use('/api/auth', auth);

app.post('/api/auth', (req, res) => {
	res.status(400).json({
		errors: { global: 'Invalid credentials' }
	});
});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', (req, res, next) => {
	let uploadFile = req.files.file;
	const fileName = req.files.file.name;
	uploadFile.mv(`${__dirname}/public/files/${fileName}`, function(err) {
		if (err) {
			return res.status(500).send(err);
		}

		res.json({
			file: `public/${req.files.file.name}`,
			status: 'success'
		});
	});
});

app.post('/process', (req, res, next) => {
	let file = req.body.url;
	csv()
		.fromFile(`${__dirname}/public/files/${file}`)
		.then(jsonObj => {
			var resObj = new Object();
			var columnArr = [];
			var columnKey = [];
			var size = _.size(jsonObj);
			for (const key of Object.keys(jsonObj[0])) {
				var columnObj = new Object();
				columnObj.headerName = key;
				columnObj.field = key;
				columnArr.push(columnObj);
				columnKey.push(key);
			}
			resObj.columnDefs = columnArr;
			resObj.rowData = jsonObj;
			resObj.key = columnKey;
			resObj.size = size;
			res.send(resObj);
		});
});

app.listen(PORT, () => console.log('Running on localhost:', PORT));
