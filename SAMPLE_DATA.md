# Sample Lesson Data

Use this data to seed your MongoDB database with initial lessons for testing.

## Example Lesson 1: Greetings

```json
{
  "lessonNumber": 1,
  "title": "Greetings - Cumprimentos",
  "description": "Learn basic greetings in Portuguese",
  "difficulty": "beginner",
  "vocabulary": [
    { "word": "Olá", "translation": "Hello", "pronunciation": "oh-LAH" },
    { "word": "Bom dia", "translation": "Good morning", "pronunciation": "bohn DEE-ah" },
    { "word": "Boa tarde", "translation": "Good afternoon", "pronunciation": "BOH-ah TAR-jee" },
    { "word": "Boa noite", "translation": "Good evening/night", "pronunciation": "BOH-ah NOY-chee" },
    { "word": "Tchau", "translation": "Bye", "pronunciation": "chow" }
  ],
  "examples": [
    { "portuguese": "Olá, como você está?", "english": "Hello, how are you?" },
    { "portuguese": "Bom dia! Tudo bem?", "english": "Good morning! Everything okay?" }
  ]
}
```

## Example Lesson 2: Numbers

```json
{
  "lessonNumber": 2,
  "title": "Numbers - Números",
  "description": "Learn to count from 1 to 20 in Portuguese",
  "difficulty": "beginner",
  "vocabulary": [
    { "word": "Um", "translation": "One", "pronunciation": "oong" },
    { "word": "Dois", "translation": "Two", "pronunciation": "doys" },
    { "word": "Três", "translation": "Three", "pronunciation": "trays" },
    { "word": "Quatro", "translation": "Four", "pronunciation": "KWAH-troh" },
    { "word": "Cinco", "translation": "Five", "pronunciation": "SEEN-koh" }
  ]
}
```

## Example Flashcards (for Lesson 1)

```json
[
  { "front": "Olá", "back": "Hello", "category": "greetings", "difficulty": "easy" },
  { "front": "Bom dia", "back": "Good morning", "category": "greetings", "difficulty": "easy" },
  { "front": "Boa tarde", "back": "Good afternoon", "category": "greetings", "difficulty": "easy" }
]
```

## Example Exercises (for Lesson 1)

```json
[
  {
    "type": "multiple-choice",
    "question": "How do you say 'Hello' in Portuguese?",
    "options": ["Olá", "Tchau", "Obrigado", "Por favor"],
    "correctAnswer": "Olá",
    "points": 10
  }
]
```

## Seed Script

Create `server/seed.js`:

```javascript
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
    title: "Greetings - Cumprimentos",
    description: "Learn basic greetings in Portuguese",
    difficulty: "beginner",
    vocabulary: [
      { word: "Olá", translation: "Hello", pronunciation: "oh-LAH" },
      { word: "Bom dia", translation: "Good morning", pronunciation: "bohn DEE-ah" }
    ]
  });

  await Flashcard.insertMany([
    { lessonId: lesson1._id, front: "Olá", back: "Hello", category: "greetings" }
  ]);

  await Exercise.insertMany([
    {
      lessonId: lesson1._id,
      type: "multiple-choice",
      question: "How do you say 'Hello' in Portuguese?",
      options: ["Olá", "Tchau", "Obrigado", "Por favor"],
      correctAnswer: "Olá",
      points: 10
    }
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
```

Run with: `node server/seed.js`
