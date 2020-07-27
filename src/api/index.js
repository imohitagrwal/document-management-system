/**
 * API
 */

const filesystem = require("./filesystem")


module.exports.default = function (app) {
    app.use('/api/filesystem', filesystem);
}