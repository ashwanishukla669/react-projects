const logger = (req, res, next)=> {

    console.log("========== Logger ==========");
    console.log("Method :", req.method);
    console.log("URL :", req.originalUrl);
    console.log("Time :", new Date().toLocaleString());
    console.log("============================");

    next();
    
}

module.exports = logger;