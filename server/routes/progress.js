const express = require('express');
const UserProgress = require('../models/UserProgress');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.userId }).populate('lessonId');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:lessonId', auth, async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ userId: req.userId, lessonId: req.params.lessonId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:lessonId', auth, async (req, res) => {
  try {
    const progress = await UserProgress.findOneAndUpdate(
      { userId: req.userId, lessonId: req.params.lessonId },
      { $set: req.body, $inc: { attempts: 1 } },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/stats/overview', auth, async (req, res) => {
  try {
    const allProgress = await UserProgress.find({ userId: req.userId });
    const totalLessonsCompleted = allProgress.filter(p => p.completed).length;
    const totalLessonsStarted = allProgress.length;
    const totalTimeSpent = allProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const averageScore = allProgress.length
      ? Math.round(allProgress.reduce((sum, p) => sum + (p.score || 0), 0) / allProgress.length)
      : 0;

    res.json({ totalLessonsCompleted, totalLessonsStarted, totalTimeSpent, averageScore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
