const path = require('path')
const nodeExternals = require('webpack-node-externals')
const isCoverage = process.env.NODE_ENV === 'coverage'

const coverageRule = (isCoverage) ? [{test: /\.(js|jsx)$/, exclude: /node_modules|\.spec\.js|webComponentWrapper\.js/, enforce: 'post', use: { loader: 'istanbul-instrumenter-loader', options: {esModules: true} }}] : []

module.exports = {
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'inline-cheap-module-source-map',
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'test'),
            path.resolve(__dirname, 'node_modules')
        ],
    },
    module: {
        rules: [
            ...coverageRule,
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
            {test: /\.(less|svg|woff|woff2|ttf|css)$/, use: ['null-loader']}
        ]
    },
}
