const Tutorials = require("../models/tutorial.model.js");

// Create and Save a new Tutorials
exports.create = (req, res) => {
  
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Tutorials with a id
exports.findOne = (req, res) => {
  
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

// Update a Tutorials identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorials with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorials
  const tutorials = new Tutorials({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Tutorials in the database
  Tutorials.create(tutorials, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorials."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorials.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Tutorials.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Tutorials.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorials with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorials with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorials.updateById(
    req.params.id,
    new Tutorials(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorials with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorials with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Tutorials.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorials with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorials with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorials was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Tutorials.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};