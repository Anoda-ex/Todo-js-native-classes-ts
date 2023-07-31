

import webpack from 'webpack'
import path from 'path'

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/types';


export default (env:BuildEnv) => {
    let paths:BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        outputFile: path.resolve(__dirname, 'build'),
        htmlEntry: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }
    
    let config:webpack.Configuration = buildWebpackConfig({
        mode: env.mode || 'development',
        paths:paths,
        idDev: (env.mode || 'development')==='development',
        port: env.port || 3000
    })
    return config 
};