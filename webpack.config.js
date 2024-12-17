import path from 'path';
import {fileURLToPath} from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './src/js/vjslider.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vjslider.js',
        library: {
            name: 'VJSlider',
            type: 'var',
            export: 'default'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'vjslider.css'
        }),
        new ESLintPlugin({
            configType: 'flat'
        })
    ],
    devServer: {
        port: 8363,
        host: '127.0.0.1',
        static: {
            directory: __dirname,
        },
        devMiddleware: {
            publicPath: '/dist'
        }
    }
};
