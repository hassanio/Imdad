if (process.env.NODE_ENV === 'production') {
    //we are in production so return the prod set of keys
    module.exports = require('./prod')
} else {
    //we are in development so return dev set of keys
    module.exports = require('./dev')
}