const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
      inline: true,
      compress: true,
      port: 8080
    },
    module: {
        rules: [
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'file-loader',
                options: {
                    name: 'dist/media/[name].[ext]',
                    publicPath: url => url.replace(/public/, '')
                }
            },
            {   
                test: /\.svg$/,
                oneOf: [
                    { resourceQuery: /in/, use: 'svg-inline-loader'},
                    { resourceQuery: /ex/, use: 'file-loader' }
                ]
            },
            {
                test: /\.less$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(woff|woff2|ttf)$/, 
                loader: 'file-loader', 
                options: { name: 'fonts/[name].[ext]'}
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {loader: 'babel-loader'}
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.tmpl.html')}),
        new webpack.HotModuleReplacementPlugin()
    ]
}
