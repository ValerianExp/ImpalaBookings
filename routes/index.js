module.exports = app => {

    // Base routes
    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    // Auth routes
    const authRouter = require("./auth.routes");
    app.use("/", authRouter);

    // Hotels routes
    const hotelRouter = require("./hotels.routes");
    app.use("/", hotelRouter);

    //Users routes
    const userRouter = require("./users.routes");
    app.use("/", userRouter);
}
