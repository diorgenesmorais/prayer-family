import React from 'react';
import './SortedList.css'

const SortedList = ({ data }) => {
  return (
    <div className='person-drawn'>
        <h3 hidden={!data.length} className='drawn-title'>Últimos sorteados</h3>
        <ul>
        {data.slice(0, 5).map((item, i) => (
            <li className='person' key={i}>
            <span>{item.name}</span>
            <span>({item.drawnIn})</span>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default SortedList;
