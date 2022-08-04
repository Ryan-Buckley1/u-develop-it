const express = require("express");
const db = require("./db/connections");
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use((req, res) => {
  res.status(404).end();
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});
