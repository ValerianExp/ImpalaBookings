module.exports = app => {

    // Base routes
    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    // Auth routes
    const authRouter = require("./auth.routes");
    app.use("/", authRouter);

    // Hotels routes
    const hotelRouter = require("./hotels.routes");
    app.use("/hotels", hotelRouter);

    //Users routes
    const userRouter = require("./users.routes");
    app.use("/", userRouter);

    //Parameters routes
    const parametersRouter = require("./parameters.routes");
    app.use("/parametros", parametersRouter);


}
