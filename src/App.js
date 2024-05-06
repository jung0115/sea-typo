import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./Main";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 동적 경로 */}
        <Route path="/:text" element={<Main />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
