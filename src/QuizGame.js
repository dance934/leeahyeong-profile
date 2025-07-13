import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './QuizGame.css';

const allQuestions = [
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
  {
    questionText: '李雅英的綽號是什麼?',
    answerOptions: [
      { answerText: '雅英老師', isCorrect: true },
      { answerText: '雅英公主', isCorrect: false },
      { answerText: '雅英寶貝', isCorrect: false },
      { answerText: '雅英女神', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英在哪個社交平台最活躍?',
    answerOptions: [
      { answerText: 'Instagram', isCorrect: true },
      { answerText: 'Facebook', isCorrect: false },
      { answerText: 'Twitter', isCorrect: false },
      { answerText: 'TikTok', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英的第一支啦啦隊是？',
    answerOptions: [
      { answerText: 'NC Dinos', isCorrect: true },
      { answerText: 'LG Twins', isCorrect: false },
      { answerText: 'Doosan Bears', isCorrect: false },
      { answerText: 'Lotte Giants', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英喜歡的食物是什麼？',
    answerOptions: [
      { answerText: '炸雞', isCorrect: true },
      { answerText: '泡菜', isCorrect: false },
      { answerText: '烤肉', isCorrect: false },
      { answerText: '拌飯', isCorrect: false },
    ],
  },
  {
    questionText: '李雅英的幸運數字是什麼？',
    answerOptions: [
      { answerText: '7', isCorrect: true },
      { answerText: '3', isCorrect: false },
      { answerText: '8', isCorrect: false },
      { answerText: '9', isCorrect: false },
    ],
  },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const questions = shuffleArray(allQuestions).slice(0, 5);

export default function QuizGame({ onGameOver }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const scoreSectionRef = useRef(null);
  const correctAnswersRef = useRef(null);

  const handleAnswerOptionClick = (isCorrect, answerText) => {
    setUserAnswers([...userAnswers, { question: questions[currentQuestion].questionText, answer: answerText, isCorrect }]);
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

  

  const handleShareScreenshot = async () => {
    if (!correctAnswersRef.current) return;

    try {
      const canvas = await html2canvas(correctAnswersRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio,
      });
      canvas.toBlob(async (blob) => {
        if (blob) {
          const filesArray = [new File([blob], 'quiz_results.png', { type: 'image/png' })];
          if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            await navigator.share({
              files: filesArray,
              title: '李雅英粉絲小遊戲結果截圖',
              text: `我在李雅英粉絲小遊戲中答對了 ${score} / ${questions.length} 題！`,
            });
            alert('截圖已分享！');
          } else {
            alert('您的瀏覽器不支持分享圖片，請手動保存截圖。');
            // Fallback for browsers that don't support sharing files
            const link = document.createElement('a');
            link.download = 'quiz_results.png';
            link.href = canvas.toDataURL();
            link.click();
          }
        } else {
          alert('無法生成截圖。');
        }
      }, 'image/png');
    } catch (error) {
      console.error('截圖分享失敗', error);
      alert('截圖分享失敗，請稍後再試。');
    }
  };

  return (
    <div className='quiz-game'>
      {showScore ? (
        <div className='score-section' ref={scoreSectionRef}>
          你答對了 {score} / {questions.length} 題
          <div className='correct-answers' ref={correctAnswersRef}>
            <h4>所有題目:</h4>
            <ul>
              {userAnswers.map((userAnswer, index) => {
                const question = questions.find(q => q.questionText === userAnswer.question);
                const correctAnswer = question.answerOptions.find(opt => opt.isCorrect).answerText;
                return (
                  <li key={index}>
                    {userAnswer.question}<br />
                    <span style={{ color: userAnswer.isCorrect ? 'green' : 'red' }}>你的答案: {userAnswer.answer} {userAnswer.isCorrect ? '(正確)' : '(錯誤)'}</span><br />
                    {!userAnswer.isCorrect && <span style={{ color: 'green' }}>正確答案: {correctAnswer}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="quiz-buttons">
            <button onClick={onGameOver}>返回主頁</button>
            <button onClick={handleShareScreenshot} style={{ marginLeft: '10px' }}>分享結果</button>
          </div>
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
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}>{answerOption.answerText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}