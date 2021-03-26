const env = process.env.NODE_ENV;

let config = require('./dev');

if(env === "production" || env === "prd") {
    config = require('./prd');
} else if (env === "staging" || env === "hml") {
    config = require('./hml');
}

export {config};
export default config;