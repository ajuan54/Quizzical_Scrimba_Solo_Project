import React from "react";

export default function Start(props) {
  return (
    <section>
      <div className="outer">
        <div className="blob1"></div>
      </div>
      <div className="title-Body">
        <h1>Quizzical</h1>
        <h3>Some description if needed</h3>
        <button className="startBtn" onClick={props.startQuiz}>
          Start Quiz!
        </button>
      </div>
      <div className="outer">
        <div className="blob2"></div>
      </div>
    </section>
  );
}
