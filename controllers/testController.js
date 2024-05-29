import Test from '../models/TestModel.js';

// get all test
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: 'An error occurred while getting tests', error });
  }
};

//handle submit test
export const submitTest = async (req, res) => {
  try {
    const { testId, answers, completionTime } = req.body;
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }
    let score = 0;
    test.questions.forEach((question, index) => {
      const userAnswer = answers.find(
        (answer) => answer.question_id.toString() === question._id.toString()
      );
      if (userAnswer && question.correct === userAnswer.answer) {
        question.isCorrect = true;
        score += 1;
      } else {
        question.isCorrect = false;
      }
      question.userAnswer = userAnswer ? userAnswer.answer : null;
    });
    test.score = score;
    test.completionTime = completionTime;
    test.isSubmitted = true;

    await test.save();

    res.status(200).json(test);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: 'An error occurred while submitting test', error });
  }
};

// get all ranked test
export const getRankedTests = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await Test.aggregate([
      {
        $match: {
          isSubmitted: true,
        },
      },
      {
        $sort: {
          score: -1,
          completionTime: 1,
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: '$userId',
          data: {
            $first: '$$ROOT',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $sort: {
          'data.score': -1,
          'data.completionTime': 1,
          'data.createdAt': 1,
        },
      },
      {
        $facet: {
          paginatedResults: [{ $skip: skip }, { $limit: limit }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]);

    const tests = result[0].paginatedResults.map((test) => {
      return {
        _id: test.data._id,
        userId: test._id,
        userName: test.user.name,
        score: test.data.score,
        completionTime: test.data.completionTime,
        createdAt: test.data.createdAt,
      };
    });
    const totalTests = result[0].totalCount[0]
      ? result[0].totalCount[0].count
      : 0;
    const numOfPages = Math.ceil(totalTests / limit);

    res.status(200).json({ totalTests, tests, numOfPages, currentPage: page });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: 'An error occurred while getting ranked tests', error });
  }
};
