const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

//---------------POST----------------------------------
router.post("/", (req, res) => {
  const actions = req.body;

  if (!actions.project_id || !actions.description || !actions.notes) {
    res
      .status(400)
      .json({ message: "Please provide a project id of an existing project with a description and notes" });
  } else {
    db.insert(actions)
        .then(post => {
            res
              .status(201)
              .json(post)
        })
        .catch(err => {
            res
              .status(500)
              .json({ message: "There was an error while saving." });
        });
    }
});

//---------------GET----------------------------------
router.get("/", (req, res) => {
  db.get()
    .then(get => {
        res
          .status(200)
          .json(get);
    })
    .catch(error => {
        res
          .status(500)
          .json({ message: "Error getting" });
    });
});

//---------------GET----------------------------------
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(actions => {
        res
          .status(200)
          .json(actions);
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
    .then(action => {
        res
          .status(200)
          .json(action);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "ID does not exist." });
    });
});

//---------------PUT----------------------------------
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const action = req.body;

  db.update(id, action)
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