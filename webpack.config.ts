const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.ts',
    },
    output: {
        path: '/dist',
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
                        targets: { node: 'current' }, // 노드일 경우만
                        modules: 'false'
                    }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-stage-0'
                ],
            },
            exclude: ['/node_modules'],
        },
            {
                test: /\.jsx?$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    emitWarning: true,
                    configFile: "./.eslintrc.json"
                }
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ],
    },
    plugins: [],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};