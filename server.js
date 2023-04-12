const express = require("express")
const cors = require("cors")
const config = require("./app/config/config")
const db = require("./app/models")
const app = express();
require('dotenv').config()

var corsOptions = {
  origin: "http://localhost:5432"
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./app/middleware/errorHandler")

//Routes
const {inviteeRoutes,userRoutes,eventRoutes} = require('./app/routes');
app.use("/invitee", inviteeRoutes);
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use(errorHandler)


// drop the table if it already exists
db.sequelize.sync({ force:false,logging: false}).then(() => {
  console.log("Drop and re-sync db.");
});

//simple api
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

//Server connection 
const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
