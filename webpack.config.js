module.exports = {
    entry: __dirname + '/js/init.js',
    
    output: {
        path: __dirname + '/js',
        filename: 'main.js'
    },

    module: {
        loaders: [
            {
                test: '/\.js$/',
                exclude: '/(node_modules)/',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}