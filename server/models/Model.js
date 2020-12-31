const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
	longUrl: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
	},
});

module.exports = mongoose.model('Url', urlSchema);
