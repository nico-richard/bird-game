import type { Component } from "solid-js";
import "./QuestionCard.sass";

interface QuestionCardProps {
  index: number;
  question: string;
  answers: string[];
}

const QuestionCard: Component<QuestionCardProps> = (props) => {
  return (
    <div class="question-card">
      <h3>Question {props.index + 1}</h3>
      <p>{props.question}</p>
      <div class="answers">
        {props.answers.map((answer: string, index: number) => (
          <p>{answer}</p>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
