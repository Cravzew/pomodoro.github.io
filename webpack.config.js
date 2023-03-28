const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: !devMode ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                                localIdentName: "[local]",
                            },
                        }
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new MiniCssExtractPlugin({}),
        new HtmlWebpackPlugin({
            title: "Pomodoro-Box",
            favicon: "./src/images/favicon.png"
        })
    ],
    devServer: {
        static: './dist'
    },
    optimization: {
        runtimeChunk: 'single'
    }
}