import webpack from 'webpack'
import path from 'path'
import { buildPlugins } from "./buildPluging"
import { buildLoaders } from "./buildLoaders"
import { BuildOptions } from './types/types'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(buildOptions:BuildOptions):webpack.Configuration{
    return{
        mode: buildOptions.mode,
        entry: buildOptions.paths.entry, 
        output:{
            filename: '[name].[contenthash].js',
            path: buildOptions.paths.outputFile,
            clean:true
        },
        devtool: buildOptions.idDev ? 'inline-source-map' : undefined,
        devServer: buildOptions.idDev ? buildDevServer(buildOptions) : undefined,
        plugins: buildPlugins(buildOptions),
        module: {
            rules:buildLoaders(buildOptions),
        },
        resolve: {
            //нужно для того чтобы не писать /test.js => /test
            extensions: ['.ts', '.js'],
            preferAbsolute: true,
            modules: [buildOptions.paths.src, 'node_modules'],
            alias:{}
        },
    }
}