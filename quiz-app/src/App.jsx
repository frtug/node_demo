import React from 'react';
import Quiz from './component/quiz';
import './App.css';
import FullscreenButton from './component/fullscreen';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

function RouteApp(){
  return (
<div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
        <FullscreenButton/>

      </header>
      <main>
        <Quiz />
      </main>
  </div>
  )
  
}

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RouteApp/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    
  );
}

export default App;