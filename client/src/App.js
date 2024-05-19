import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleDraw = async () => {
    try {
      const response = await fetch('/draw');
      const data = await response.json();
      setName(data.name);
      setMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleControl = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMessage(data.message);
      setName('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='control-btn'>
          <button className="btn btn-draw" onClick={handleDraw}>Sorteio</button>
          <button className='btn btn-last-draw' onClick={() => handleControl('/last-draw')}>Último</button>
          <button className='btn btn-reset' onClick={() => handleControl('/reset')}>Reset</button>
        </div>
        <div>
          <p className='chosen-one'>{name}</p>
          <p className='message'>{message}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
