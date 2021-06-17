require("dotenv").config()
// const { decodeBase64 } = require("bcryptjs");
const Express = require("express");
const app = Express();
const dbConnection = require("./db")

// app.use('/test', (req, res) => {
//     res.send("testing endpint")
// });

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

app.use(require("./middleware/validate-jwt"));
app.use("/log", controllers.logController);


dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3000, () => {
        console.log(`[Server]: App is listening on 3000.`);
    });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    });