const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//----->  ROUTERS
app.use("/deposit", require("./routes/deposit"));
app.use("/withdraw", require("./routes/withdraw"));
app.use("/account", require("./routes/account"));
app.use("/newOrder", require("./routes/newOrder"));
app.use("/cancelOrder", require("./routes/cancelOrder"));
app.use("/queryOrder", require("./routes/queryOrder"));
app.use("/myTrades", require("./routes/myTrades"));
app.use("/allOrders", require("./routes/allOrders"));
app.use("/depositHistory", require("./routes/depositHistory"));
app.use("/withdrawHistory", require("./routes/withdrawHistory"));

//----->  SERVER
const PORT = process.env.PORT || 1234;

app.listen(PORT, () => console.log(`Server is listening at Port ${PORT}`));
app.get("/", (req, res) => {
    res.send("We get the request");
});
