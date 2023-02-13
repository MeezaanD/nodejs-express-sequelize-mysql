const db = require("../models");
const Tutorials = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Tutorials
      const Tutorials = new Tutorials({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
      });
    
      // Save Tutorials in the database
      Tutorials.create(tutorial, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorials."
          });
        else res.send(data);
      });
};

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

exports.findAllPublished = (req, res) => {
  
};