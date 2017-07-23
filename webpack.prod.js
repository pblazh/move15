const webpack = require('webpack');
module.exports = {
	devtool: 'cheap-module-source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'react-hot-loader!babel-loader'
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	entry: [
		'./src/js/main.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'js/main.js',
		sourceMapFilename: '[name].map'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		})
	]
};
