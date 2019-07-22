module.exports = (api) => {
    let targets = {};
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
