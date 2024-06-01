import React, { useEffect, useState } from 'react';
import './App.css';
import SortedList from './SortedList';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [drawn, setDrawn] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getDrawnStatus();
  }, [name, message]);

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

  const getDrawnStatus = async () => {
    try {
      const response = await fetch('/status');
      const data = await response.json();
      setDrawn(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    setShowPopup(false);
    handleControl('/reset')
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='control-btn'>
          <button className="btn btn-draw" onClick={handleDraw}>Sorteio</button>
          <button className='btn btn-last-draw' onClick={() => handleControl('/last-draw')}>Último</button>
          <button className='btn btn-reset' onClick={() => handleDeleteClick()}>Reset</button>
        </div>
        {!showPopup &&
          <div>
          <div className='name-effect'>
            <p className='chosen-one'>{name}</p>
          </div>
          <p className='message'>{message}</p>
        </div>
        }
        {showPopup &&
          <div className="popup">
            <p>Confirma a exclusão do item?</p>
            <button className='btn btn-reset' style={{"margin-right": "16px"}} onClick={handleConfirmDelete}>Confirmar</button>
            <button className='btn btn-last-draw' onClick={handleCancelDelete}>Cancelar</button>
          </div>
        }
      </header>
      <div className='list-status'>
        <SortedList data={drawn} />
      </div>
      <span className='made-by'>Made by Diorgenes Morais</span>
    </div>
  );
}

export default App;
