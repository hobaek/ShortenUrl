const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlController = require('./Routes/Controller');
app.use(cors());
const MONGODB_URL =
	'mongodb+srv://hobaek:5151@cluster0.ahqdm.mongodb.net/seungho?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL, { useNewUrlParser: true }, err => {
	if (err) {
		console.log(err);
	} else {
		console.log('MongoDB is connected');
	}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../client'));

app.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});
app.use('/add', urlController.postUrl, (req, res) => {
	res.status(200).send('after add');
});

app.use('/get', urlController.getUrl, (req, res) => {
	res.status(200).json(res.locals);
});

app.use('/api/:shortUrl', urlController.shortUrl, (req, res) => {
	const longUrl = res.locals.longUrl;
	res.redirect(`${longUrl}`);
});

app.delete(
	'/delete/:id',
	urlController.deleteUrl,
	urlController.getUrl,
	(req, res) => {
		res.status(200).json(res.locals);
	}
);

app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
