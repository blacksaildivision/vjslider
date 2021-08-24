const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: './src/js/vjslider.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vjslider.js',
            libraryTarget: 'var',
            libraryExport: 'default',
            library: 'VJSlider'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'expanded'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }

            ],
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
};
