module.exports = (api) => {
    let targets = {
        browsers: '> 1%, IE 11, not dead',
    };
    if (api.env() === 'test') {
        targets = {node: 'current'};
    }

    const presets = [['@babel/preset-env', {targets: targets}]];
    const plugins = ['@babel/plugin-transform-object-assign'];

    return {
        presets,
        plugins
    };
};
