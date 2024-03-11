const path = require('path');

module.exports = [
    {
        entry: './js/index.js',
        mode: 'development',
        output: {
            path: path.resolve(__dirname, '../static'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
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
    },
    {
        entry: './js/styles.js',
        mode: 'development',
        output: {
            path: path.resolve(__dirname, '../static'),
            filename: 'styles.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader', 'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },

            ]
        }
    }
];
