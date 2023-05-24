import React from "react";
import { decode } from "html-entities";

export default function Quizzical(props) {
  function styler(combo, index) {
    if (props.showAnswers === true) {
      if (props.question.correct_answer === combo) {
        return { backgroundColor: "#94D7A2" };
      } else if (props.question.selected_answer === index) {
        return { backgroundColor: "#F8BCBC" };
      } else {
        return { backgroundColor: "#F5F7FB" };
      }
    } else {
      return props.question.selected_answer === index
        ? { backgroundColor: "#D6DBF5" }
        : { backgroundColor: "#F5F7FB" };
    }
  }

  const combo = props.question.combo.map((combo, index) => (
    <button
      key={index}
      dangerouslySetInnerHTML={{ __html: combo }}
      onClick={(event) => props.selectAnswer(event, props.id, index)}
      style={styler(combo, index)}
      disabled={props.showAnswers}
      className="answer-Container"
    />
  ));

  return (
    <div className="questionContainer">
      <h2
        className="question"
        dangerouslySetInnerHTML={{ __html: decode(props.question.question) }}
      />
      <div className="answer">{decode(combo)}</div>
      <hr className="hrQuestion" />
    </div>
  );
}
