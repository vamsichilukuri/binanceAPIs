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
        .testOrder({
            symbol: req.body.symbol, // STRING & Required
            side: req.body.side, // ENUM & Required
            type: req.body.type, // ENUM & Required
            timeInForce: req.body.timeInForce, // ENUM & Required
            quantity: req.body.quantity, // DECIMAL & Required
            //  quoteOrderQty: req.body.quoteOrderQty, // DECIMAL & Optional
            price: req.body.price, // DECIMAL & Optional
            //  newClientOrderId: req.body.newClientOrderId, // STRING & Optional
            //  stopPrice: req.body.stopPrice, // DECIMAL & Optional
            //  icebergQty: req.body.icebergQty, // DECIMAL & Optional
            //  newOrderRespType: req.body.newOrderRespType, // ENUM & Optional
            //  recvWindow: req.body.recvWindow, // LONG & Optional
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
