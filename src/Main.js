import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
import './Main.css';

import BackgroundImage from "../src/background.jpeg";

// 히스토리의 초기 배열을 생성
const generateInitialHistory = (length) => {
  return Array.from({ length }, () => ({ x: 0, y: 0 }));
};

function Main() {
  const [sentence, setSentence] = useState("씨라이프 부산에서 선보이는 바다일렁체");
  const [sentenceLength, setSentenceLength] = useState(sentence.length);

  // const { text } = useParams();
  // if(text != null && text.length > 0) sentence = text;

  // 텍스트 입력창의 onChange 이벤트 핸들러
  const handleInputChange = (e) => {
    setSentence(e.target.value); // 입력된 텍스트를 상태로 업데이트
    setSentenceLength(e.target.value.length);
  };

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
    <Container>
      <Background>
        {/* 텍스트 입력창 */}
        <Input
          type="text"
          value={sentence} // 입력값을 상태로 바인딩
          onChange={handleInputChange} // 값이 변경될 때 호출될 이벤트 핸들러
          placeholder="텍스트를 입력하세요"
        />

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
      </Background>

      <Download>

      </Download>

    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  background-image: url(${BackgroundImage});
  width: 100vw;
  min-height: 100vh;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  font-family: 'Sea';
  overflow-y: auto;
`;

const Input = styled.input`
  margin-bottom: 40px;
  padding: 2px 8px;
  width: 28vw;
  height: 1.3rem;
  font-family: 'Sea';
  background-color: transparent;
  border-width: 1px;
  border-radius: 3px;
`;

const Download = styled.div`
  width: 100vw;
  background-color: white;
  height: 10vh;
`;

export default Main;
