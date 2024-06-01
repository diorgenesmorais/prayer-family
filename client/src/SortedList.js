import React from 'react';
import './SortedList.css'

const SortedList = ({ data }) => {
  return (
    <ul className='person-drawn'>
      {data.map((item, i) => (
        <li className='person' key={i}>
          <span>{item.name}</span>
          <span>({item.drawnIn})</span>
        </li>
      ))}
    </ul>
  );
};

export default SortedList;
