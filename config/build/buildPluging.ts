import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from 'webpack'
import { BuildOptions } from "./types/types"
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildPlugins(buildOptions:BuildOptions):webpack.WebpackPluginInstance[]{
    return [
        new HtmlWebpackPlugin({
            template: buildOptions.paths.htmlEntry,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename:'css/[name].[contenthash].css'
        })

    ]
}