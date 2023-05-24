import "./styles.css";
import { useEffect, useState } from "react";
import Quizzical from "./Quizzical";
import Start from "./Start";

export default function App() {
  const [quiz, setQuiz] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  const startQuiz = () => setQuiz((prevState) => !prevState);

  function playAgain() {
    setQuiz(true);
    setAnswer(false);
    setAllComplete(false);
  }

  function checkAnswers() {
    setAnswer(true);
  }

  useEffect(() => {
    if (quiz === false) {
      fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      )
        .then((res) => res.json())
        .then((data) =>
          setQuestions(
            data.results.map(function (question) {
              return {
                question: question.question,
                combo: question.incorrect_answers
                  .concat([question.correct_answer])
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value),
                selected_answer: undefined,
                correct_answer: question.correct_answer
              };
            })
          )
        );
    }
  }, [quiz]);

  function selectAnswer(event, quest_id, combo_id) {
    setQuestions(function (prev) {
      return questions.map(function (quest, qid) {
        if (quest_id === qid) {
          return { ...quest, selected_answer: combo_id };
        } else {
          return quest;
        }
      });
    });
  }

  useEffect(() => {
    var count = 0;
    for (var i = 0; i < questions.length; i++) {
      if (typeof questions[i].selected_answer !== "undefined") {
        if (
          questions[i].combo[questions[i].selected_answer] ===
          questions[i].correct_answer
        ) {
          count++;
        }
      }
    }
    setScore(count);
  }, [answer]);

  useEffect(() => {
    setAllComplete(
      questions.every((quest) => typeof quest.selected_answer !== "undefined")
    );
  }, [questions]);

  const questionElements = questions.map((question, index) => (
    <Quizzical
      key={index}
      id={index}
      question={question}
      selectAnswer={selectAnswer}
      showAnswers={answer}
    />
  ));
  return (
    <main>
      {quiz ? (
        <Start startQuiz={startQuiz} />
      ) : (
        <section>
          <div className="outer">
            <div className="blob1"></div>
          </div>
          <div className="questionBody">
            {questionElements}
            {answer ? (
              <div className="buttonAnswerScore">
                <h3 className="score">
                  {"You scored " + score + "/5 correct answers"}
                </h3>
                <button className="checkAnswers" onClick={playAgain}>
                  Play Again
                </button>
              </div>
            ) : (
              <button
                className="checkAnswers"
                disabled={!allComplete}
                onClick={checkAnswers}
              >
                Check Answers
              </button>
            )}
          </div>
          <div className="outer">
            <div className="blob2"></div>
          </div>
        </section>
      )}
    </main>
  );
}
