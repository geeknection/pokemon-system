const {
    override,
    fixBabelImports,
    addBabelPlugin
} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", [
        {
            libraryName: "antd",
            libraryDirectory: "es"
        },
        {
            libraryName: "ant-design-pro",
            libraryDirectory: "lib"
        }
    ]),
    addBabelPlugin([
        "babel-plugin-root-import",
        {
            rootPathSuffix: "src",
            rootPathPrefix: "#"
        }
    ])
);