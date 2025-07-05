import React, { useState } from 'react';
import './QuizGame.css';

const questions = [
  {
    questionText: '李雅英的MBTI是什麼？',
    answerOptions: [
      { answerText: 'ENFP', isCorrect: true },
      { answerText: 'ISTJ', isCorrect: false },
      { answerText: 'ESFJ', isCorrect: false },
      { answerText: 'INTP', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英2022-2023年應援的韓國棒球隊是？',
    answerOptions: [
      { answerText: 'Doosan Bears', isCorrect: false },
      { answerText: 'NC Dinos', isCorrect: true },
      { answerText: 'LG Twins', isCorrect: false },
      { answerText: 'Samsung Lions', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英應援的台灣啦啦隊是哪隊?',
    answerOptions: [
      { answerText: 'Fubon Angels', isCorrect: true },
      { answerText: 'Rakuten Girls', isCorrect: false },
      { answerText: 'Passion Sisters', isCorrect: false },
      { answerText: 'Uni-Girls', isCorrect: false },
    ],
  },
  {
    questionText: '以下哪項不是李雅英的興趣？',
    answerOptions: [
      { answerText: '唱歌', isCorrect: false },
      { answerText: '跳舞', isCorrect: false },
      { answerText: '寫程式', isCorrect: true },
      { answerText: '叫人起床', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英的生日是？',
    answerOptions: [
        { answerText: '2月9日', isCorrect: true },
        { answerText: '7月24日', isCorrect: false },
        { answerText: '5月18日', isCorrect: false },
        { answerText: '10月3日', isCorrect: false },
    ],
  },
];

export default function QuizGame({ onGameOver }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='quiz-game'>
      {showScore ? (
        <div className='score-section'>
          你答對了 {score} / {questions.length} 題
          <div className='correct-answers'>
            <h4>正確答案:</h4>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  {question.questionText}: {question.answerOptions.find(opt => opt.isCorrect).answerText}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onGameOver}>返回主頁</button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>第 {currentQuestion + 1}</span>/{questions.length} 題
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}