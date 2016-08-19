module.exports = {
    entry: "./src/js/vjslider.js",
    output: {
        path: "./dist/",
        filename: "vjslider.js",
        libraryTarget: "var",
        library: "VJSlider"
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint", exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/}
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};