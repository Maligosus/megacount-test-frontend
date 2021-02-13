  
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

const SRC_PATH=path.resolve(__dirname,"src");
const BUILD_PATH=path.resolve(__dirname,"dist");
const CONTENT_BASE=path.join(__dirname,"/");
const APP_PORT=3000;
const SERVER_PORT=8080;

const pluginList = [
    new HtmlWebpackPlugin({
        template:"./index.html",
        filename:"index.html"
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[hash:8].css"
    })
]

module.exports={
    mode:"development",
    entry:{
        main: path.join(SRC_PATH,"index.tsx")
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].[hash:8].js",
        publicPath: "/"
    },
    module:{
        rules:[
                {
                    test: /\.tsx?$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'ts-loader'
                    }
            },
            {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    resolve:{
        extensions:[".ts",".tsx",".js",".jsx"]
    },
    devServer:{
        publicPath:"/",
        host:'0.0.0.0',
        port: APP_PORT,
        contentBase: CONTENT_BASE,
        proxy:{
            "/all" : "http://localhost:8080",
            "/courseNumber" : "http://localhost:8080",
            "/facultyName"  : "http://localhost:8080",
            "/dateOfBirth"  : "http://localhost:8080"
        }
    },
    plugins:pluginList
};