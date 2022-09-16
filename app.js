// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "ImpalaBookings";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// Partials
hbs.registerPartials(__dirname + "/views/partials");

// 👇 Start handling routes here

// const index = require("./routes/index.routes");
// app.use("/", index);
// const hotels = require("./routes/hotels.routes");
// app.use('/hotels', hotels);
// const users = require("./routes/users.routes");
// app.use('/users', users);
// const auth = require('./routes/auth.routes');
// app.use('/auth', auth);

// Session config
require('./config/session.config')(app)

// Routes
require("./routes")(app)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
