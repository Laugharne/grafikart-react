## Le hook useEffect

https://fr.legacy.reactjs.org/docs/hooks-intro.html



Dans le chapitre précédent on a découvert notre premier hook le **useState** qui permet de créer un petit état local au niveau d'un composant définit sous forme de fonction.

Maintenant on peut se dire ok si c'est la nouvelle manière de définir des composants, comment je vais faire pour mes cycle de vie.  Par exemple le component **didMount** ou le component **willUnmout**.  Comment on va pouvoir gérer ça ?

Donc là on va découvrir un nouveau hook qui nous permet justement de remédier à ce problème là, c'est le hook **useEffect** ce hook va permettre de créer un code qui va avoir un effet de bord par rapport à votre composant.

Ce que l'on va faire c'est qu'on va s'imaginer qu'on va garder le premier compteur que l'on avait créé <Compteur /> et on garde ce système d'incrémentation.

Lorsqu'on va incrémenter, le titre de la page va changer, qui est quelque chose qui est en dehors du contexte du composant et on va utiliser le **useEffect**...


```jsx
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
  });
  
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

Le code que l'on doit exécuter ici ne doit être exécuté que si le compteur change on pourrait s'imaginer que notre compteur à peut-être donc d'autres fonctionnalités et on ne veut pas nécessairement relancer le code qui change le titre systématiquement donc nous effect va prendre un second paramètre qui sera un tableau des valeurs à observer, **des dépendances*, nous ici on va lui dire c'est [count].

Donc globalement ce tableau de dépendance est très important parce qu'il va permettre de détecter quand il ya des changements.
Donc si une des valeurs de ce tableau à changé, automatiquement l'effet le code qui se trouve dans le **useEffec()** va être ré exécuté.

```jsx
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
  }, [count]);
  
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

