const router = require("express").Router();
const api = require("binance");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
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
        .depositHistory({
            // recvWindow: req.body.recvWindow, // LONG & Optional
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
