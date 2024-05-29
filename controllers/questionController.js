import Question from '../models/QuestionModel.js';
import { google } from 'googleapis';
import Test from '../models/TestModel.js';

const auth = new google.auth.GoogleAuth({
  keyFile: './utils/credentials.json',
  scopes: ['https://www.googleapis.com/auth/documents'],
});

export const importQuestions = async (req, res) => {
  try {
    const data = await readGoogleDocs(
      '1H6OJHsK_yQd5ESqsH_yuaYzO_doW4K6e_00I4g63s60'
    );

    let questionsData = extractTextRuns(data.body.content);
    questionsData = questionsData.filter(
      (object) => object.content.trim() !== ''
    );
    questionsData = questionsData.map((run) => {
      let content = run.content.replace(/^\s*[a-d][.)]\s*|\d+[.)]\s*/, '');
      let type = content.startsWith('Câu') ? 'question' : 'answer';
      if (type === 'question') {
        run.isAnswer = false;
      }
      return { type, content, isAnswer: run.isAnswer };
    });

    let questions = [];
    let currentQuestion = null;
    questionsData.forEach((item) => {
      if (item.type === 'question') {
        let content = item.content.replace(/^\s*[a-d][.)]\s*/, '').trim();
        content = content.replace(
          /^\s*Câu \d+[:.]\s*|[a-d][.)]\s*|\d+[.)]\s*/,
          ''
        );
        currentQuestion = {
          question: content,
          answers: [],
          correct: null,
        };
        questions.push(currentQuestion);
      } else if (item.type === 'answer' && item.content.trim() !== '') {
        currentQuestion.answers.push(
          item.content.replace(/^\s*[a-d][.)]\s*/, '').trim()
        );
        if (item.isAnswer) {
          currentQuestion.correct = currentQuestion.answers.length - 1;
        }
      }
    });

    let filteredQuestions = questions.filter(
      (question) => question.answers.length !== 4
    );

    await Question.insertMany(questions);

    res.status(200).json(filteredQuestions);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: 'An error occurred while importing questions', error });
  }
};

function extractTextRuns(obj) {
  let textRuns = [];

  for (let key in obj) {
    if (key === 'textRun') {
      let content = obj[key].content;
      let isAnswer = obj[key].textStyle.bold;
      textRuns.push({ content, isAnswer });
    } else if (typeof obj[key] === 'object') {
      textRuns = textRuns.concat(extractTextRuns(obj[key]));
    }
  }

  return textRuns;
}

async function readGoogleDocs(documentId) {
  try {
    const docs = google.docs({ version: 'v1', auth });

    const response = await docs.documents.get({ documentId });

    return response.data;
  } catch (error) {
    console.error('error', error);
  }
}

export const getListQuestions = async (req, res) => {
  try {
    const userId = req.user.userId;
    let foundTest = await Test.find({ userId });
    // check if user has taken the test with created at in last 30 minutes
    if (foundTest.length > 0) {
      const lastTest = foundTest[foundTest.length - 1];
      const now = new Date();
      const diff = now - lastTest.createdAt;
      if (diff < 30 * 60 * 1000 && !lastTest.isSubmitted) {
        //return lastTest questions without correct answer
        lastTest.questions.forEach((question) => {
          delete question.correct;
          delete question.isCorrect;
        });
        return res.status(200).json({
          questions: lastTest.questions,
          testId: lastTest._id,
          startTime: lastTest.createdAt,
        });

        // return res.status(200).json({ questions: lastTest.questions });
      }
    }
    const questions = await Question.aggregate([{ $sample: { size: 30 } }]);
    questions.forEach((question) => {
      const correctAnswer = question.answers[question.correct];

      question.answers.sort(() => Math.random() - 0.5);

      const newCorrectIndex = question.answers.indexOf(correctAnswer);

      question.correct = newCorrectIndex;
    });

    const test = new Test({ questions, userId });
    await test.save();

    // do net return correct
    questions.forEach((question) => {
      delete question.correct;
    });

    res
      .status(200)
      .json({ questions, testId: test._id, startTime: test.createdAt });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
};
