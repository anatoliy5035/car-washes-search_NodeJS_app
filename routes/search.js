module.exports = (req, res) => {
    let convertedCords = {
        lat : 49.428180,
        lng : 32.039510
    };
    console.log(req.body)
    res.send(convertedCords);
};
