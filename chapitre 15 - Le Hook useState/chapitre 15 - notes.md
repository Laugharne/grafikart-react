## Les hooks

https://fr.legacy.reactjs.org/docs/hooks-intro.html

Les Hooks sont arrivés avec React 16.8. Ils vous permettent de bénéficier d’un état local et d’autres fonctionnalités de React sans avoir à écrire une classe.

Aux composants définis sous forme de fonctions...

Ils résolvents deux problèmes principaux.
1. Les hooks apportent une approche fonctionnelle à la gestion de l'état. (pas besoin de créer des classes pour ça)
2. a




Un hook est une série de fonctions qui commence par "use" et qui permettent de rajouter des fonctionalités qui ont attrait à l'état ou au cycle de vie de notre composant 

### Le hook "useState"

Qui va permetre de dire qu'une fonction a besoin d'un état !

```jsx
import {render} from 'react-dom';
import React, { useState } from 'react';

function Compteur() {
	const state = useState(0);
	console.log( state);
	return <button></button>;
}

render(
	<div>
		<Compteur />
	</div>,
	document.getElementById('app')
);
```

```jsx
import {render} from 'react-dom';
import React, { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);
  const handleClick = function(e) {
    e.preventDefault();
    setCount(10);
  };

  return <button onClick={handleClick}>Nombre : {count}</button>;
}

render(
  <div>
    <Compteur />
  </div>,
  document.getElementById('app')
);
```
Un useState ne peux pas être dans une condition ou une boucle !

Car c'est l'odre d'appel qui lui permet de savoir et retrouver la correspondance.

```jsx
import {render} from 'react-dom';
import React, { useState } from 'react';

function Compteur() {
  const [state, setState] = useState({});
  const handleClick = function(e) {
    e.preventDefault();
    setState({
      count: 10
    });
  }

  return <div onClick={handleClick}>
    {JSON.stringify(state)}
  </div>;
}

render(
  <div>
    <Compteur />
  </div>,
  document.getElementById('app')
);
```
Contrairement au setState, il n'y a pas de fusion d'objet !


```jsx
import {render} from 'react-dom';
import React, { useState } from 'react';

function Compteur() {
  const [count,  setCount]  = useState(0);
  const [count2, setCount2] = useState(0);

  const handleClick = function(e) {
    e.preventDefault();
    setCount( c => c+1);
  }
  const handleClick2 = function(e) {
    e.preventDefault();
    setCount2( c => c+2);
  }

  return <>
    <button onClick={handleClick}>Incrément +1 : {count}</button>
    <button onClick={handleClick2}>Incrément +2 : {count2}</button>
  </>;
}

render(
  <div>
    <Compteur />
  </div>,
  document.getElementById('app')
);
```

A chaque fous que l'on fait une "set" la fonction <Compteur> est automatiquement rappellée.

Par rapport à l'approche par classe ce qui est très intéressant avec les hooks c'est qu'on va pouvoir extraire une partie de la logique dans des fonctions et pouvoir exposer des hooks personnalisés.


```jsx
import {render} from 'react-dom';
import React, { useState } from 'react';

function useIncrement() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount( c => c+1);
  };
  return [count, increment];
}

function Compteur() {
  const [count, increment] = useIncrement();
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
```

Toute la logique liée au changement d'état est extrait (isolée) dans une autre fonction qui est un hook personalisé, rendant le code à l'intérieur du composant plus clair et léger.

Ce qu'il faut retenir basiquement c'est que lorsque vous faites appel à useState() il va créer une variable qui va être sauvegardées comme l'état du composant et tout au long de la vie de ce composant là ce hook va permettre de mémoriser la valeur.

Donc à chaque fois qu'il ya un nouveau rendu la fonction et ré appelé mais grâce à useState() automatiquement React connaît la valeur précédente et dans votre première variable "[count, ...]" il mettra la valeur qui correspond à l'état.

Le second paramètre "[... , setCout}" c'est toujours un setter qui va permettre de changer la valeur de l'état.

Donc comme pour la fonction setState() si vous faites une mutation qui dépend de l'état précédent, mieux vaudra utiliser un call back et contrairement à setState() par contre, dès que vous faites un changement d'état vous devez lui passer un nouvel objet, il n'y a pas de fusion comme ça pouvait être le cas sur setState().

Ensuite quelques règles importantes :
1. Vous ne pouvez pas changer l'ordre des useState() sinon ça perd complètement React, React utilise l'ordre d'appel pour savoir à quel état correspond chaque appel à useState() donc si vous changez l'ordre suite à des conditions ou des boucles vous allez avoir des problèmes.
2. L'autre chose c'est que si jamais vous décidé d'extraire mais on aura le temps d'en reparler dans les prochains chapitres comme je l'ai fait ici vous ne devez faire appel au hook de React que dans des hooks personnalisés, que dans d'autres fonctions qui agiront comme des hooks.  Vous ne pouvez pas le mettre dans n'importe quelle fonction de votre système c'est très important sinon ça créera des problèmes.

```jsx
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
```
