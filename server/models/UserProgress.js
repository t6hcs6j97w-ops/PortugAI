const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  exercisesCompleted: { type: Number, default: 0 },
  exercisesTotal: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
