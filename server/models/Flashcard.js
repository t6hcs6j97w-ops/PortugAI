const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  front: { type: String, required: true },
  back: { type: String, required: true },
  audioUrl: String,
  category: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
}, { timestamps: true });

module.exports = mongoose.model('Flashcard', flashcardSchema);
