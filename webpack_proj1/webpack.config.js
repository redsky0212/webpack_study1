const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['./src/index.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'venders',
                        chunks: 'all'
                    }
                }
            }
        }
    };

    if(options.mode === 'development'){

        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'Development',
                showErrors: true    // 에러발생시 메세지가 브라우저 화면에 노출.
            })
        ];
        config.devtool = 'inline-source-map';
        config.devServer = {
            hot: true,  // 서버에서 HMR을 켠다.
            host: '0.0.0.0',    // 디폴드로는 'localhost'로 잡혀있다. 외부에서 개발 서버에 접속해서 테스트하기 위해서는 '0.0.0.0'으로 설정해야한다.
            contentBase: path.resolve(__dirname, 'dist'),  // 개발서버의 루트 경로
            stats: {
                color: true
            }
        };

    }else{
        // Production 설정
        config.plugins = [
            new CleanWebpackPlugin()
        ];
    }

    return config;
}