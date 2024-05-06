import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./Main";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 동적 경로 */}
        {/*<Route path="/sea-typo/:text" element={<Main />} />*/}
        <Route path="/sea-typo/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
