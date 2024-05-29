import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
  }

  .test-view {
    width: 100%;
    flex-direction: row;
    font-size: 16px;
    flex: 1;
  }

  .test-view__left {
    width: 412px;
    background-color: var(--white);
    border: 1px solid #eaf0f7;
    border-radius: 6px 0 0 6px;
    box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.2);
    z-index: 2;

    .list-heading {
      padding: 24px;
    }

    .list-title {
      font-size: 18px;
      margin-right: auto;
    }

    .list-title.not-mobile {
      display: block;
    }

    .list-title.mobile {
      display: none;
    }

    .list-score {
      font-size: 24px;
      font-weight: bold;
      display: flex;
      gap: 5px;
      .score {
        color: var(--green-600);
      }
    }

    .countdown-test {
      width: 100px;
      padding: 3px 15px;
      font-size: 20px;
      font-weight: bold;
      border-radius: var(--border-radius);
      border: 2px solid transparent;
      text-align: center;
    }

    .countdown-test.yellow {
      color: var(--yellow-600);
      border-color: var(--yellow-600);
    }

    .countdown-test.red {
      color: var(--primary-600);
      border-color: var(--primary-600);
    }

    .question-list {
      padding: 20px;
      max-height: calc(100vh - 350px);
      overflow-x: hidden;
      overflow-y: auto;

      .list-item {
        flex: 0 0 20%;
        padding: 15px;

        .question-item {
          height: 40px;
          width: 40px;
          border-radius: 6px;
          background-color: #f6f9fc;
          cursor: pointer;

          .question-text {
            color: #67758d;
            font-size: 14px;
            text-align: center;
          }
        }

        .current {
          border: 2px solid var(--yellow-400);
        }

        .answered {
          background-color: var(--yellow-100);

          .question-text {
            color: var(--yellow-600);
          }
        }

        .correct {
          background-color: var(--green-50);

          .question-text {
            color: var(--green-600);
          }
        }

        .wrong {
          background-color: var(--primary-50);

          .question-text {
            color: var(--primary-600);
          }
        }
      }
    }
  }

  .test-view__right {
    width: calc(100% - 412px);
    margin-left: -1px;
    padding: 50px 40px;
    border: 1px solid #eaf0f7;
    border-radius: 0 6px 0 0;
    background-color: var(--white);
    box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.2);
    z-index: 1;

    .question-heading {
      margin-bottom: 20px;
      font-size: 24px;
    }

    .question-content {
      margin: 2rem 0;
      font-size: 16px;
      white-space: pre-wrap;
    }

    .question-image {
      margin: 2rem 0;
      display: flex;
      justify-content: center;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    hr {
      margin: 1.5rem 0;
    }

    .question-answers {
      display: flex;
      flex-direction: column;

      .answer-item {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-top: 1.5rem;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .answer-item input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .answer-item .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: var(white);
        border: 2px solid #c4cfdd;
        border-radius: 50%;
        transition: all 0.2s;
      }

      .answer-item:hover input ~ .checkmark {
        border-color: var(--yellow-400);
      }

      .answer-item input:checked ~ .checkmark {
        border-color: var(--yellow-400);
      }

      .answer-item .checkmark:after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--yellow-400);
        opacity: 0;
        transition: all 0.2s;
      }

      .answer-item input:checked ~ .checkmark:after {
        opacity: 1;
      }

      .answer-item.disabled {
        cursor: default;
      }

      .answer-item.disabled:hover input ~ .checkmark {
        border-color: #c4cfdd;
      }

      .answer-item.correct {
        color: var(--green-600);

        .checkmark,
        input:checked ~ .checkmark {
          border-color: var(--green-500);
        }

        .checkmark:after {
          background: var(--green-500);
        }
      }

      .answer-item.correct.disabled:hover input ~ .checkmark {
        border-color: var(--green-500);
      }

      .answer-item.wrong {
        color: var(--primary-600);

        .checkmark,
        input:checked ~ .checkmark {
          border-color: var(--primary-400);
        }

        .checkmark:after {
          background: var(--primary-400);
        }
      }

      .answer-item.wrong.disabled:hover input ~ .checkmark {
        border-color: var(--primary-400);
      }
    }
  }

  .action-container {
    flex-wrap: wrap;
    gap: 2rem;

    & > div {
      flex-wrap: wrap;
      gap: 2rem;
    }

    .btn {
      padding: 0.375rem 2rem;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .modal {
    .modal-content {
      .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        font-size: 20px;
        font-weight: 500;

        .score {
          font-size: 28px;

          span {
            color: var(--green-500);
          }
        }

        .btn {
          padding: 0.375rem 2rem;
          margin: 0 auto;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .test-view__left {
      width: 280px;
      border-radius: 6px 6px 0 0;

      .list-title.not-mobile {
        display: none;
      }

      .question-list {
        padding: 20px;
        max-height: calc(100vh - 250px);

        .list-item {
          flex: 0 0 10%;
          padding: 10px;
        }
      }
    }

    .test-view__right {
      width: calc(100% - 300px);
      border-radius: 0 0 6px 6px;
      margin-left: 0;
    }
  }

  @media screen and (max-width: 1024px) {
    .test-view__right {
      .action-container {
        justify-content: center;
        gap: 1.5rem;

        & > div {
          justify-content: center;
          gap: 1rem;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .test-view {
      flex-direction: column;
    }
    .test-view__left {
      width: 100%;
    }
    .test-view__right {
      width: 100%;

      .action-container {
        justify-content: space-between;
      }
    }
  }

  @media screen and (max-width: 640px) {
    .test-view__left {
      .list-title.not-mobile {
        display: none;
      }

      .list-title.mobile {
        display: block;
      }

      .question-list,
      hr {
        display: none;
      }
    }

    .test-view__right {
      padding: 50px 20px;

      .action-container {
        flex-direction: column;

        & > div {
          gap: 1rem;
        }

        .btn-prev {
          margin-right: 0;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .test-view__right {
      .action-container {
        gap: 1rem;
      }
    }
  }
`;

export default Wrapper;
