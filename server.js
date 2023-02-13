const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:4040"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Meezaan Testing" });
});

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

require("./app/routes/tutorial.routes.js")(app);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});