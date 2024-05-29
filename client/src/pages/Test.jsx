import Wrapper from '../assets/wrappers/Test';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa6';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import Cookies from 'js-cookie';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { RiErrorWarningFill } from 'react-icons/ri';

const testQuery = {
  queryKey: ['test'],
  queryFn: async () => {
    const { data } = await customFetch.get('/questions');
    return data;
  },
  staleTime: 0,
};

const currentUserQuery = {
  queryKey: ['current-user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  },
};

const DURATION = 30 * 60;

const verifyTestCookie = () => {
  const testCookie = Cookies.get('test');
  if (!testCookie) {
    return false;
  }

  const test = JSON.parse(testCookie);
  if (!test.start) {
    return false;
  }

  const currentTime = Date.now();
  const startTime = Date.parse(test.startTime);
  if (currentTime - startTime > DURATION * 1000) {
    return false;
  }

  return true;
};

export const loader = (queryClient) => async () => {
  try {
    await queryClient.prefetchQuery(currentUserQuery);

    // Retrieve the current user data
    const data = queryClient.getQueryData(['current-user']);

    if (!data || !data.user) {
      await queryClient.setQueryData('previous-page', '/contest');
      return redirect('/login');
    }

    if (!verifyTestCookie()) {
      return redirect('/contest');
    } else {
      return await queryClient.fetchQuery(testQuery);
    }
  } catch (error) {
    return redirect('/');
  }
};

const Test = () => {
  const test = useLoaderData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questions, setQuestions] = useState(
    test?.questions.map((item, index) => ({ ...item, index }))
  );
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(
    questions.map((item) => ({ question_id: item._id, answer: null }))
  );
  const [timeLeft, setTimeLeft] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const startTime = Date.parse(test?.startTime) / 1000;
    setTimeLeft(Math.floor(startTime + DURATION - Date.now() / 1000));
  }, [test]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  const tick = useCallback(() => {
    setTimeLeft((prevTime) => {
      if (prevTime > 0) return prevTime - 1;
      return prevTime;
    });
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      if (timeLeft > 0) {
        const timerId = setInterval(tick, 1000);
        return () => clearInterval(timerId);
      } else if (timeLeft === 0) {
        handleSubmit();
      }
    }
  }, [isSubmitted, timeLeft, tick]);

  const getQuestionStatus = (index) => {
    let status = '';

    if (currentQuestion.index === index) {
      status += ' current';
    }
    if (isSubmitted) {
      if (questions[index]?.isCorrect) {
        status += ' correct';
      } else {
        status += ' wrong';
      }
    } else if (answers[index]?.answer !== null) {
      status += ' answered';
    }
    return status;
  };

  const getAnswerStatus = (questionIndex, userAnswerIndex) => {
    let status = '';
    if (isSubmitted) {
      status += 'disabled';
      if (userAnswerIndex === questions[questionIndex]?.correct) {
        status += ' correct';
      } else if (userAnswerIndex === questions[questionIndex]?.userAnswer) {
        status += ' wrong';
      }
    }
    return status;
  };

  const handleNext = () => {
    setCurrentQuestion(questions[(currentQuestion.index + 1) % 30]);
  };

  const handlePrev = () => {
    setCurrentQuestion(questions[(currentQuestion.index - 1 + 30) % 30]);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((item) =>
        item.question_id === questionId
          ? { ...item, answer: answerIndex }
          : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitted(true);

      const completionTime = DURATION - timeLeft;

      const body = { testId: test?.testId, answers, completionTime };
      const result = await customFetch.post('/tests/submit', body);
      toast.success('Bạn đã nộp bài thành công');
      Cookies.remove('test');
      if (result?.data) {
        setScore(result?.data?.score || 0);
        setQuestions(
          result?.data?.questions.map((item, index) => ({ ...item, index })) ||
            []
        );
      }
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

  return (
    <Wrapper>
      <div className="test-view flex">
        <div className="test-view__left">
          <div className="list-heading flex items-center justify-center">
            <div className="list-title not-mobile font-bold">
              Danh sách câu hỏi
            </div>
            {!isSubmitted ? (
              <div
                className={`countdown-test ${
                  timeLeft <= DURATION / 6 ? 'red' : 'yellow'
                }`}
              >
                {formatTime(timeLeft)}
              </div>
            ) : (
              <div className="list-score">
                <span className="score">{score}</span>
                <span>/</span>
                <span>30</span>
              </div>
            )}
          </div>
          <hr />
          <div className="question-list flex flex-wrap justify-center">
            {questions.map((_, index) => (
              <div className="list-item" key={index}>
                <div
                  className={`question-item flex items-center justify-center ${getQuestionStatus(
                    index
                  )}`}
                  onClick={() => setCurrentQuestion(questions[index])}
                >
                  <span className="question-text font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="test-view__right">
          <div className="question-heading font-bold">
            Câu hỏi {currentQuestion.index + 1}
          </div>
          <div className="question-content">{currentQuestion.question}</div>
          {currentQuestion.extend && (
            <div className="question-image">
              <img src={currentQuestion.extend} alt="question image" />
            </div>
          )}
          <hr />
          <div className="question-answers flex flex-col">
            <div className="title-note font-semibold">Chọn đáp án đúng:</div>
            <div className="answer-group flex flex-col">
              {currentQuestion.answers.map((answer, index) => (
                <label
                  className={`answer-item ${getAnswerStatus(
                    currentQuestion.index,
                    index
                  )}`}
                  key={index}
                >
                  <input
                    type="radio"
                    value={index}
                    checked={answers[currentQuestion.index]?.answer === index}
                    onChange={() => handleAnswer(currentQuestion._id, index)}
                    disabled={isSubmitted}
                  />
                  <span className="answer-text">{answer}</span>
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>
          <hr />
          <div className="action-container flex items-center justify-between">
            <div className="flex justify-between">
              <button className="btn btn-prev btn-gray" onClick={handlePrev}>
                <FaAngleLeft />
                Câu trước
              </button>
              <button className="btn btn-next" onClick={handleNext}>
                Câu sau
                <FaAngleRight />
              </button>
            </div>
            {!isSubmitted ? (
              <Popover
                isOpen={isPopoverOpen}
                positions={['top', 'bottom', 'left', 'right']}
                containerClassName="popover-container"
                onClickOutside={() => setIsPopoverOpen(false)}
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={'var(--white)'}
                    arrowSize={10}
                    arrowStyle={{ opacity: 0.7 }}
                    className="popover-arrow-container"
                    arrowClassName="popover-arrow"
                  >
                    <div className="popover-content">
                      <div className="text-container flex items-center justify-center">
                        <RiErrorWarningFill />
                        <span>Bạn chắc chắn muốn nộp bài?</span>
                      </div>
                      <div className="btn-container flex items-center justify-center">
                        <button
                          className="btn btn-cancel"
                          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        >
                          Huỷ thao tác
                        </button>
                        <button
                          className="btn btn-submit"
                          onClick={handleSubmit}
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </div>
                  </ArrowContainer>
                )}
              >
                <button
                  className="btn btn-submit btn-white"
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                  <FaCheck />
                  Nộp bài
                </button>
              </Popover>
            ) : (
              <Link to="/contest">
                <button className="btn btn-white">Về trang thi</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="container">
          <div>Chúc mừng bạn đã hoàn thành bài thi với số điểm</div>
          <div className="score">
            <span>{score}</span>/30
          </div>
          <hr />
          <button className="btn" onClick={() => setIsModalOpen(false)}>
            Xem đáp án chi tiết
          </button>
        </div>
      </CustomModal>
    </Wrapper>
  );
};
export default Test;
