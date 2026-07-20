const express = require('express');
const Exercise = require('../models/Exercise');
const UserProgress = require('../models/UserProgress');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({ lessonId: req.params.lessonId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answer } = req.body;
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });

    const correct = answer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
    res.json({
      correct,
      points: correct ? exercise.points : 0,
      correctAnswer: exercise.correctAnswer,
      explanation: exercise.explanation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
