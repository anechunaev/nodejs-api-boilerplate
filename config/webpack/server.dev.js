const { resolve } = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	mode: "development",
	target: "node",
	context: resolve(__dirname),
	devtool: "cheap-module-source-map",
	entry: {
		server: resolve(__dirname, "../../src/index.ts"),
	},
	output: {
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
		publicPath: "/dist/",
		path: resolve(__dirname, "../../dist"),
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		modules: [resolve(__dirname, "../../src"), "node_modules"],
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: "tsconfig.json",
							transpileOnly: true,
							logInfoToStdOut: true,
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		chunkIds: "named",
		moduleIds: "named",
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(false),
			__dirname: JSON.stringify(__dirname),
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: "../../tsconfig.json",
			},
		}),
	],
};
