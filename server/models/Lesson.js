const mongoose = require('mongoose');

const vocabSchema = new mongoose.Schema({
  word: String,
  translation: String,
  pronunciation: String,
  audioUrl: String,
}, { _id: false });

const exampleSchema = new mongoose.Schema({
  portuguese: String,
  english: String,
  audioUrl: String,
}, { _id: false });

const lessonSchema = new mongoose.Schema({
  lessonNumber: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  content: String,
  videoUrl: String,
  grammarPoints: [String],
  vocabulary: [vocabSchema],
  examples: [exampleSchema],
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
