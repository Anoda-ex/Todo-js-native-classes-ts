import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/types'

export function buildLoaders(buildOptions:BuildOptions):webpack.RuleSetRule[]{
    return  [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            //исключеение папки
            exclude: /node_modules/,
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        },
    ]
}