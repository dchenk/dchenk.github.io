const path = require("path");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");

module.exports = merge(webpackBaseConfig, {
	output: {
		path: path.resolve("./"),
		filename: "built-bundle.js"
	},
	module:{
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: "./src/",
		publicPath: "/",
		openPage: "index.html",
		watchContentBase: true,
		open: true
	}
});
