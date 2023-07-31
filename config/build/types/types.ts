export interface BuildPaths {
    entry: string,
    outputFile: string,
    htmlEntry: string,
    src:string
}
export interface BuildOptions{
    mode: 'production' | 'development',
    paths: BuildPaths,
    idDev: boolean,
    port: number
}
export interface BuildEnv{
    mode: 'production' | 'development',
    port: number
}