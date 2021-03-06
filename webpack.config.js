const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'vjslider.css'
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
            })
        ],
        devServer: {
            port: 8363,
            publicPath: '/dist'
        }
    };
};
