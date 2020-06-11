const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')

module.exports = {
    entry:
    {
        index: path.resolve(__dirname, '../src/index.js'),
        page: path.resolve(__dirname, '../src/page.js'),
        video: path.resolve(__dirname, '../src/video.js'),
        tournee: path.resolve(__dirname, '../src/tournee.js')
    },
    output:
    {
        filename: '[id].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
        [
            new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../static') }]),

            // Index.html
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../src/index.html'),
                chunks: ['page'],
                minify: true
            }),

            // video.html
            new HtmlWebpackPlugin({
                filename: 'video.html',
                template: path.resolve(__dirname, '../src/video.html'),
                chunks: ['video'],
                minify: true
            }),

            // tournee.html
            new HtmlWebpackPlugin({
                filename: 'tournee.html',
                template: path.resolve(__dirname, '../src/tournee.html'),
                chunks: ['tournee'],
                minify: true
            }),

            // Admin.html
            new HtmlWebpackPlugin({
                filename: 'admin.html',
                template: path.resolve(__dirname, '../src/admin.html'),
                chunks: ['index'],
                minify: false
            }),

            new MiniCssExtractPlugin()
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // CSS
                {
                    test: /\.css$/,
                    use:
                        [
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                },

                // Images
                {
                    test: /\.(jpg|jpeg|png|gif|svg)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/images/'
                                }
                            }
                        ]
                },

                // Font
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'fonts/'
                                }
                            }
                        ]
                },

                // Shaders
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    exclude: /node_modules/,
                    use: [
                        'raw-loader',
                        'glslify-loader'
                    ]
                }
            ]
    }
}
