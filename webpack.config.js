module.exports = {
    entry: './src/js/vjslider.js',
    output: {
        path: './dist/',
        filename: 'vjslider.js',
        libraryTarget: 'var',
        library: 'VJSlider'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};