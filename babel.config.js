module.exports = (api) => {
    api.cache(true);

    const presets = [['@babel/preset-env', {targets: {node: 'current'}}]];
    const plugins = ['@babel/plugin-transform-object-assign'];

    return {
        presets,
        plugins
    };
};
