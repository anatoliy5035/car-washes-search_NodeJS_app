module.exports = (req, res) => {
    let convertedCords = {
        lat : 49.428180,
        lng : 32.039510
    };
    let address = Object.keys(req.body)[0];
    console.log(address);
    res.send(convertedCords);
};
