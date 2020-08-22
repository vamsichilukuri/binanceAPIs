const router = require("express").Router();
const api = require("binance");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", (req, res) => {
    const binanceRest = new api.BinanceRest({
        key: req.body.apiKey, // API-Key
        secret: req.body.sKey, // Secret-Key
        timeout: 15000,
        recvWindow: 10000,
        disableBeautification: false,
        handleDrift: true,
        baseUrl: process.env.BINANCE_BASE_URL,
        requestOptions: {},
    });

    binanceRest
        .depositAddress({
            asset: req.body.asset, // STRING & Required
            network: req.body.network, // STRIN & Optional
            address: req.body.address, // STRING & Required
            addressTag: req.body.addressTag, // STRING & Optional
            amount: req.body.amount, // DECIMAL & Required
            name: req.body.name, // STRING & Optional
            recvWindow: req.body.recvWindow, // LONG & Optional
            timestamp: Date.now(), // LONG & Required
        })
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((error) => {
            res.send(error);
            console.log(error);
        });
});

module.exports = router;
