import React, { useState, useEffect, useRef } from 'react';
import './FanAssistant.css';

// Updated QA database with keywords for fuzzy matching
const qaDatabase = [
  {
    keywords: ['mbti', '個性', '性格'],
    answer: '雅英的MBTI是ENFP，是個熱情活潑的小太陽喔！☀️'
  },
  {
    keywords: ['韓國', '棒球', 'nc dinos'],
    answer: '雅英在2022-2023賽季是為韓國職棒的NC Dinos應援的！'
  },
  {
    keywords: ['台灣', '啦啦隊', 'fubon angels', '富邦'],
    answer: '在台灣，雅英是Fubon Angels的一員，為富邦悍將加油！💙'
  },
  {
    keywords: ['興趣', '喜歡做什麼'],
    answer: '雅英最喜歡唱歌和跳舞了，是個多才多藝的女孩！💃🎤'
  },
  {
    keywords: ['生日', '幾歲', '什麼時候出生'],
    answer: '雅英的生日是1992年2月9日，是個可愛的水瓶座寶寶！♒'
  },
  {
    keywords: ['綽號', '叫什麼', '老師'],
    answer: '大家都叫她雅英老師，是不是很親切呀？👩‍🏫'
  },
  {
    keywords: ['ig', 'instagram', '社群', '社交平台'],
    answer: '快來追蹤雅英的IG吧！她的帳號是 <a href="https://www.instagram.com/yyyoungggggg/?hl=zh-tw" target="_blank" rel="noopener noreferrer">yyyoungggggg</a>，超多美照的喔！📸'
  },
  {
    keywords: ['第一支', '出道', '開始'],
    answer: '雅英的啦啦隊生涯是從NC Dinos開始的喔！🦖'
  },
  {
    keywords: ['食物', '喜歡吃', '炸雞'],
    answer: '雅英最愛吃炸雞了！聽說可以一次吃掉一整桶呢！🍗'
  },
  {
    keywords: ['幸運數字', '數字', '7'],
    answer: '雅英的幸運數字是7，lucky seven！✨'
  },
  {
    keywords: ['你好', 'hi', 'hello'],
    answer: '哈囉！我是智能小英，你的雅英小百科！有什麼想問的嗎？儘管問吧！😉'
  },
  {
    keywords: ['你是誰', '誰'],
    answer: '我就是智能小英呀！專門為你解答關於雅英的各種問題！😊'
  },
  {
    keywords: ['謝謝', '感謝', '掰掰', 'bye'],
    answer: '不客氣～！隨時都可以再來找我聊天喔！掰掰～👋'
  },
  {
    keywords: ['勞工'],
    answer: '勞工是我們心中最軟的一塊！😉'
  },
];

const getResponse = (input) => {
  const lowercasedInput = input.toLowerCase();
  for (const qa of qaDatabase) {
    for (const keyword of qa.keywords) {
      if (lowercasedInput.includes(keyword)) {
        return qa.answer;
      }
    }
  }
  return '抱歉，我還不了解這個問題。也許您可以換個方式問問看？';
};

export default function FanAssistant({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);

  useEffect(() => {
    setMessages([{
      text: '哈囉！我是智能小英，你的雅英小百科！有什麼想問的嗎？儘管問吧！😉',
      sender: 'assistant'
    }]);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    const botResponse = getResponse(input);
    
    setTimeout(() => {
        const assistantMessage = { text: botResponse, sender: 'assistant' };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 500);

    setInput('');
  };

  return (
    <div className="fan-assistant">
      <div className="fan-assistant-header">
        <h2>智能小英</h2>
        <div className="fan-assistant-buttons">
          <button onClick={onBack}>返回主頁</button>
        </div>
      </div>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
             <span dangerouslySetInnerHTML={{ __html: msg.text }}></span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="在這裡輸入問題..."
        />
        <button onClick={handleSend}>傳送</button>
      </div>
    </div>
  );
}