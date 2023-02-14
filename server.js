const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4040"
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Meezaans server" });
});

require("./app/routes/tutorial.routes.js")(app);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});