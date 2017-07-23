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
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/js/main.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'js/main.js',
		sourceMapFilename: '[name].map'
	},
	devServer: {
		contentBase: './dist',
		hot: true
	}
};
