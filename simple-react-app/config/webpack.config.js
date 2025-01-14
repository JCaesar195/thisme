const { CheckerPlugin } = require('awesome-typescript-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');


module.exports = {
    entry: './src/index.tsx',
    output:{
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions : ['.ts', '.tsx', '.js', '/jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest']
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less?$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'less-loader',
                        options:{
                            paths: [path.resolve(__dirname, 'node_modules')],
                        }
                    },
                ]
            },
            {
                test: /\.css?$/,
                use:[
                    {loader: 'style-loader'},
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: '/',
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[hash:6].[ext]',
                            fallback: 'file-loader',
                            publicPath: './'
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './static/index.html'
        })
    ]
};