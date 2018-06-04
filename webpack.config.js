const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    return {
        entry: './src/js/vjslider.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vjslider.js',
            libraryTarget: 'var',
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
                            loader: 'css-loader',
                            options: {
                                minimize: argv.mode === 'production'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }

            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'vjslider.css'
            })
        ],
        devServer: {
            port: 8363,
            publicPath: '/dist'
        }
    }
};
