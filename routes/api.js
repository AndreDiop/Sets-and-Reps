// Dependencies
const express = require("express");
const Workout = require("../models/Workout");
const router = express.Router();

// GET route returns last workout
router.get("/api/workouts", (req, res) => {
  Workout.find()
  .sort({"day": -1})
  .limit(1)
  .then((workout) => {
    res.json(workout);
  });
});

// POST route creates a workout
router.post("/api/workouts/", (req, res) => {
  Workout.create(req.body).then((workout) => {
    res.json(workout);
  });
});

// PUT route adds an exercise to workout
router.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body);

    Workout.findByIdAndUpdate(id, {
      $push: {exercises: req.body}
    })
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        console.log(err);
      });
});

// GET route returns the last 7 workouts
router.get("/api/workouts/range", (req,res) => {
  Workout.find({})
  .sort({"day": -1})
  .limit(7)
  .then((workouts) => {
    res.json(workouts);
  })
});

// Export
module.exports = router;