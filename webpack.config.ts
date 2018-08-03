const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.ts',
    },
    output: {
        path: '/test/dist',
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env', {
                        targets: {node: 'current'}, // 노드일 경우만
                        modules: 'false'
                    }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-stage-0'
                ],
            },
            exclude: ['/node_modules/'],
            query: {
                presets: ['es2015']
            }
        },
        ],
    },
    plugins: [],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};