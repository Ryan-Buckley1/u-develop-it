const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "election",
  },
  console.log("connected to the election database")
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/candidates/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(row);
//   });

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
