const fs = require("fs");
const path = require("path");
const { yamlParse } = require("yaml-cfn");
const TerserPlugin = require('terser-webpack-plugin');

const file = fs.readFileSync(path.join(__dirname, "template.yml"), { encoding: "utf-8" });
const template = yamlParse(file);
const entries = Object
    .entries(template.Resources)
    .reduce((acc, [_, { Type, Properties: { Handler } }]) => {
        if (Type === "AWS::Serverless::Function") {
            acc[Handler.split(".")[1]] = Handler.replace("dist", "src").replace(/[^.]+$/, "ts");
            console.log(acc)
        }
        return acc;
    }, {});
module.exports = {
    entry: entries,
    target: "node",
    mode: "production",
    stats: "minimal", //Only output when errors or new compilation happen (compilation- directory exists or not)
    devtool: false,
    performance: {    //allows you to control how webpack notifies you of assets and entry points that exceed a specific file limit.
        hints: 'warning', //Turns hints on/off. In addition, tells webpack to throw either an error or a warning when hints are found.
    },
    externals: {
        "aws-sdk": "commonjs aws-sdk" //excluding dependencies
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    resolve: {
        extensions: [".json", ".ts", ".js"],
    },
    output: {
        libraryTarget: "commonjs2",
        path: __dirname,
        filename: "[name].js",
    },
};
