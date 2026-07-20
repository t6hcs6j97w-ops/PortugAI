const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  type: { type: String, enum: ['multiple-choice', 'fill-blank', 'translation'], required: true },
  question: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String, required: true },
  explanation: String,
  imageUrl: String,
  audioUrl: String,
  points: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
