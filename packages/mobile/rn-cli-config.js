var path = require("path");
var config = {
    getProjectRoots() {
        console.log({__dirname})
        return [
            // Keep your project directory.
            path.resolve(__dirname),

            // Include arc/root directory as a new root.
            path.resolve(__dirname, "../../")
        ];
    }
}
module.exports = config;