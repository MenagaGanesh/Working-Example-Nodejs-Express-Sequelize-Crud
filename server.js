// Express web server in server.js where we configure CORS, initialize & run Express REST APIs.

//Express is for building the Rest apis
const express = require("express");

// cors provides Express middleware to enable CORS with various options.
const cors = require("cors"); 

// Creating express app
const app = express();

var corsOptions = {
  origin: "*" //Allow all origins (i.e) allow all the client ip's
};

//This CORS is mainly used for allowing clients to access the server API
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route -define a GET route which is simple for test.
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GKMINDS" });
});
require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});