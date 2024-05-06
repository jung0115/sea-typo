import React, { useEffect, useState } from 'react';
import './App.css';

// 히스토리의 초기 배열을 생성
const generateInitialHistory = (length) => {
  return Array.from({ length }, () => ({ x: 0, y: 0 }));
};

function App() {
  const sentence = '마우스를 따라오는 텍스트';
  const sentenceLength = sentence.length;

  // 히스토리 길이를 문장의 2배 정도로 설정
  const historyLength = sentenceLength * 7;

  // 마우스 움직임 히스토리 상태를 유지
  const [history, setHistory] = useState(generateInitialHistory(historyLength));

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY };

      // 새로운 위치를 추가하고, 히스토리의 길이를 유지
      setHistory((prevHistory) => {
        const newHistory = [newPoint, ...prevHistory.slice(0, historyLength - 1)];
        return newHistory;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <div className="App">
      {Array.from({ length: sentenceLength }).map((_, index) => {
        // 문자 간격을 유지하도록 히스토리의 위치를 계산
        
        const historyIndex = index * 7;
        
        // 히스토리 인덱스가 범위 내에 있는지 확인
        if (historyIndex >= history.length) {
          return null; // 범위를 초과하면 null 반환
        }

        const position = history[historyIndex]; 

        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              transition: 'all 0.2s ease-out',
            }}
          >
            {sentence[index]}
          </span>
        );
      })}
    </div>
  );
}

export default App;
