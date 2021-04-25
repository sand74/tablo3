const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack')
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

module.exports = [{
    name: 'client',
    mode: 'development',
    devtool: 'cheap-source-map',
    entry: [ path.join(CURRENT_WORKING_DIR, '/src/index.js') ],
    output: { // NEW
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: "bundle.js",
        publicPath: "/dist/"
    }, // NEW Ends
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        htmlPlugin
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {name: '/static/[name].[ext]'}
            }
        ]
    }
}, {
    name: "server",
    mode: 'development',
    entry: [ path.join(CURRENT_WORKING_DIR , '/server/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: "server.generated.js",
        publicPath: "/dist/"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }

}];