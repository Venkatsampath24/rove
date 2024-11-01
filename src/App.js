// App.js
import React from 'react';
import FireworkAnimation from './components/FireworkAnimation';
import './App.css';

function App() {
  return (
    <div className="App">
      <audio autoPlay loop>
        <source src="path-to-your-audio-file.mp3" type="audio/mp3" />
      </audio>
      <FireworkAnimation />
    </div>
  );
}

export default App;
