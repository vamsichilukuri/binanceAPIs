const router = require("express").Router();
const api = require("binance");
const dotenv = require("dotenv");
dotenv.config();

router.delete("/", (req, res) => {
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
        .cancelOrder({
            symbol: req.body.symbol, // STRING & Required
            orderId: req.body.orderId, // STRING & Opional (Either orderId or origClientOrderId must be sent)
            origClientOrderId: req.body.origClientOrderId, // STRING & Opional (Either orderId or origClientOrderId must be sent)
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
