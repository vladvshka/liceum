const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/app/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};

module.exports.plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
];

module.exports.module = {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                "css-loader"
            ]
        },
        {
            test: /\.html$/,
            use: ["html-loader"]
        }
    ]
};