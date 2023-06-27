import {render} from 'react-dom';
import React, { useEffect, useState } from 'react';


function useIncrement( initial, step) {
  const [count, setCount] = useState(initial);
  const increment = () => {
    setCount( c => c+step);
  };
  return [count, increment];
}


function Compteur() {
  const [count, increment] = useIncrement(0, 2);
  useEffect(() => {
    document.title = 'Compteur : ' + count;
  } );

  return <>
    <button onClick={increment}>Incrément +1 : {count}</button>
  </>;
}


render(
  <div>
    <Compteur />
  </div>,
  document.getElementById('app')
);
