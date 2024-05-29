import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answers: {
        type: [String],
        required: true,
      },
      userAnswer: {
        type: Number,
        required: false,
      },
      extend: {
        type: String,
        required: false,
      },
      correct: {
        type: Number,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: false,
      },
    },
  ],
  score: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    required: false,
  },
  completionTime: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model("Test", testSchema);

export default Test;
