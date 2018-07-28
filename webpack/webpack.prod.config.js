const path = require("path");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
	output: {
		path: path.resolve("./", "dist"),
		filename: "bundle-[contenthash].js"
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({}),
			new OptimizeCssAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "bundle-[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
		new HtmlWebpackStringReplacePlugin({
			"\t<script src=\"built-bundle.js\"></script>\n": ""
		})
	]
});
