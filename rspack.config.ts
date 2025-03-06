import { CssExtractRspackPlugin, HtmlRspackPlugin } from "@rspack/core";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { defineConfig } from "@rspack/cli";
import unpluginTypia from "@ryoppippi/unplugin-typia/rspack";

const isProduction = process.env["NODE_ENV"] === "production";

const config = defineConfig((env) => ({
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
    entry: {
        index: "./src/ts/script.ts"
    },
    output: {
        filename: (pathData) => `js/${pathData.chunk?.name}.js?${pathData.contentHash}`,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/u,
                exclude: [/node_modules/u],
                loader: "builtin:swc-loader",
                options: {
                    jsc: {
                        parser: {
                            syntax: "typescript"
                        }
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.css$/i,
                use: [CssExtractRspackPlugin.loader, "css-loader"],
                type: "javascript/auto"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CssExtractRspackPlugin({
            runtime: false,
            filename: (pathData) => `css/${pathData.chunk?.name}.css?${pathData.contentHash}`
        }),
        new HtmlRspackPlugin({
            template: "./src/html/index.html",
            filename: "./index.html",
            minify: true,
            chunks: ["index"]
        }),
        unpluginTypia({
            cache: true
        })
    ]
}));

export default config;
