const router = require("express").Router();
const api = require("binance");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
    const binanceRest = new api.BinanceRest({
        key: req.body.apiKey,
        secret: req.body.sKey,
        timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
        recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
        disableBeautification: false,
        handleDrift: true,
        baseUrl: process.env.BINANCE_BASE_URL,
        requestOptions: {},
    });
    binanceRest
        .queryOrder({
            symbol: req.body.symbol,
            orderId: req.body.orderId,
            origClientOrderId: req.body.origClientOrderId,
            timestamp: Date.now(),
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
