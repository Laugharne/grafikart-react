import {render} from 'react-dom';
import React, { useState } from 'react';


function useIncrement( initial, step) {
  const [count, setCount] = useState(initial);
  const increment = () => {
    setCount( c => c+step);
  };
  return [count, increment];
}

function Compteur() {
  const [count, increment] = useIncrement(0, 2);
  return <>
    <button onClick={increment}>Incrément +1 : {count}</button>
  </>;
}

function CompteurA() {
  const [count, increment] = useIncrement(0, 2);
  return <>
    <a onClick={increment}>{count}</a>
  </>;
}


render(
  <div>
    <Compteur />
    <CompteurA />
  </div>,
  document.getElementById('app')
);
