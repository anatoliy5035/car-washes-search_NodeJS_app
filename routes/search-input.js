// let getCordsFromInput =  require('../midleware/get-cord');
module.exports = (req, res, next) => {
    let address = Object.keys(req.body)[0];
    // res.status(300).send({ redirectUrl : ""});
    res.locals.addressForSearch = address;
    console.log(req.locals)
    next();
};

module.exports = (req, res, next) => {

};
