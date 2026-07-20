const express = require('express');
const Flashcard = require('../models/Flashcard');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ lessonId: req.params.lessonId });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.create(req.body);
    res.status(201).json(flashcard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(flashcard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
