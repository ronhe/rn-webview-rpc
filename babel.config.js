module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", {
            "targets": {
                "browsers": [
                    "last 2 versions", "ios >= 7", "android >= 4.4"
                ]
            }
        }],
        "@babel/preset-react",
        "@babel/preset-flow",
    ];

    const plugins = [
        ["@babel/plugin-transform-runtime", {
            "helpers": false,
            "corejs": 3,
            "regenerator": true
        }],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        ["@babel/plugin-proposal-class-properties", { "loose": false }],
        "@babel/plugin-proposal-json-strings"
    ];

    const sourceType = 'unambiguous';

    return {
        presets,
        plugins,
        sourceType
    };
}