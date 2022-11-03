import path from "path";
import { Configuration } from "webpack";
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const config: Configuration = {
    mode: 'development',
    plugins: [
        new NodePolyfillPlugin()
    ],
    entry: "./src/index.ts",
    module: {

        rules: [

            {
                test: /\.(ts|js|json|wasm)?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],

            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js",".json", '.wasm'],
        fallback: {
            "fs": false
        },
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },


};

export default config;

// "build": "sh scripts/build.sh",