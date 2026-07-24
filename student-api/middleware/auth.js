const auth = (req, res, next) => {

    return res.status(401).json({
        message: "Unauthorized"
    });

    next();

}

module.exports = auth;