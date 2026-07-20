const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
const Flashcard = require('./models/Flashcard');
const Exercise = require('./models/Exercise');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Lesson.deleteMany({});
  await Flashcard.deleteMany({});
  await Exercise.deleteMany({});

  const lesson1 = await Lesson.create({
    lessonNumber: 1,
    title: 'Greetings - Cumprimentos',
    description: 'Learn basic greetings in Portuguese',
    difficulty: 'beginner',
    vocabulary: [
      { word: 'Olá', translation: 'Hello', pronunciation: 'oh-LAH' },
      { word: 'Bom dia', translation: 'Good morning', pronunciation: 'bohn DEE-ah' },
    ],
  });

  await Flashcard.insertMany([
    { lessonId: lesson1._id, front: 'Olá', back: 'Hello', category: 'greetings' },
  ]);

  await Exercise.insertMany([
    {
      lessonId: lesson1._id,
      type: 'multiple-choice',
      question: "How do you say 'Hello' in Portuguese?",
      options: ['Olá', 'Tchau', 'Obrigado', 'Por favor'],
      correctAnswer: 'Olá',
      points: 10,
    },
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
