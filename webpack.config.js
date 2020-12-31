const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: ['react-hot-loader/patch', './client/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: { loader: 'babel-loader' },
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	devServer: {
		host: 'localhost',
		port: 8080,
		contentBase: path.resolve(__dirname, 'client'),
		publicPath: '/',
		historyApiFallback: true,
		inline: true,
		proxy: {
			'/': {
				target: 'http://localhost:3000/',
				secure: false,
			},
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers':
				'X-Requested-With, content-type, Authorization',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html',
		}),
	],
};

module.exports = config;
