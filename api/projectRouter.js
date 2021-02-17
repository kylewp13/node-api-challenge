const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

//---------------POST----------------------------------
router.post("/", (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    res
      .status(400)
      .json({ message: "Please provide a name and description" });
  } else {
    db.insert(project)
        .then(data => {
            res
              .status(201)
              .json(data)
        })
        .catch(err => {
            res
              .status(500)
              .json({ message: "There was an error while saving the project to the database." });
        });
    }
});

//---------------GET----------------------------------
router.get("/", (req, res) => {
  db.get()
    .then(projects => {
        res 
          .status(200)
          .json(projects);
    })
    .catch(error => {
        res
          .status(500)
          .json({ message: "Error getting" });
    });
});

//---------------GET----------------------------------
router.get("/:id", (req, res) => {
  const id = req.params.id
  db.get(id)
    .then(project => {
        res
          .status(200)
          .json(project);
    })
    .catch(error => {
        res
          .status(500)
          .json({ message: "Error getting" });
    });
});

//---------------GET----------------------------------
router.get("/:id/actions", (req, res) => {
  const id = req.params.id;

  db.getProjectActions(id)
    .then(action => {
      if (action) {
            res
              .status(201)
              .json(action);
      } else {
        res
          .status(404)
          .json({ message: "specified ID does not exist." });
      }
    })
    .catch(error => {
        res
          .status(500)
          .json({ message: "Error getting" });
    });
});

//---------------DELETE----------------------------------
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(project => {
        if (project > 0) {
            res
              .status(200)
              .json(project);
        } else {
            res
            .status(500)
            .json({ message: "ID does not exist." });
        }
    })
    .catch(error => {
        res
            .status(500)
            .json({ message: "error with delete." });
    });
});

//---------------PUT----------------------------------
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const project = req.body;

  db.update(id, project)
    .then(data => {
        res
          .status(200)
          .json(data);
    })
    .catch(err => {
        res
          .status(500)
          .json({ message: "Error updating" });
    });
});

module.exports = router;