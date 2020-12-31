const urlController = {};
const Url = require('../models/Model');

urlController.getUrl = async (req, res, next) => {
	try {
		const urlList = await Url.find();

		res.locals.urls = urlList;
		return next();
	} catch (err) {
		console.error(err.message);
		res.status(500).send('error');
	}
};

urlController.postUrl = async (req, res, next) => {
	try {
		const { longUrl, shortUrl } = req.body;
		let existUrl = await Url.findOne({ longUrl: longUrl });
		if (existUrl) {
			res.status(400).json({ errors: [{ msg: 'longUrl already exists' }] });
		}
		const urlList = new Url({
			longUrl,
			shortUrl,
		});
		await urlList.save();
		return next();
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

urlController.shortUrl = async (req, res, next) => {
	const { shortUrl } = req.params;
	try {
		const findUrl = await Url.findOne({ shortUrl: shortUrl });
		const originalUrl = findUrl.longUrl;

		res.locals.longUrl = originalUrl;
		return next();
	} catch (err) {
		console.error(err.message);
		res.status(500).send('error');
	}
};

urlController.deleteUrl = async (req, res, next) => {
	const { id } = req.params;

	const newData = await Url.findByIdAndDelete(id);
	res.locals.without = newData;
	next();
};
module.exports = urlController;
