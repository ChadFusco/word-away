const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

mongoose.connect('mongodb://localhost:27017/answers');

console.log('inside db.js');

const answerSchema = new mongoose.Schema({
  answerID: { type: Number, required: true, unique: true},
  answer: { type: String, required: true, unique: true },
  synonym: { type: String, required: true }
})

// setting up model, which is analagous to a "Collection" in MongoDB.
const Answers = mongoose.model('Answers', answerSchema);

// SEED GLOSSARY WITH INITIAL VALUES IF NO DOCUMENTS EXIST IN DB
let startingAnswers = [
  { answerID: 1, answer: 'ornery', synonym: 'ill-tempered' },
  { answerID: 2, answer: 'ablate', synonym: 'erode'},
  { answerID: 3, answer: 'haggle', synonym: 'barter'},
];

Answers.countDocuments({}, (err, count) => {
  if (!count) {
    Answers.insertMany(startingAnswers, function(err) {
      if (err) {
        console.log('err:', err);
      } else {
        console.log('startingAnswers successfully saved!')
      }
    })
  }
})

module.exports = Answers;