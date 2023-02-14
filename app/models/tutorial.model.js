 const sql = require("./db.js");

// constructor
const Tutorials = function(tutorials) {
  this.title = tutorials.title;
  this.description = tutorials.description;
  this.published = tutorials.published;
};

Tutorials.create = (newTutorials, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorials, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorials: ", { id: res.insertId, ...newTutorials });
    result(null, { id: res.insertId, ...newTutorials });
  });
};

Tutorials.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorials: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorials with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorials.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorials.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorials.updateById = (id, tutorials, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorials.title, tutorials.description, tutorials.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorials with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorials: ", { id: id, ...tutorials });
      result(null, { id: id, ...tutorials });
    }
  );
};

Tutorials.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorials with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorials with id: ", id);
    result(null, res);
  });
};

Tutorials.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorials;