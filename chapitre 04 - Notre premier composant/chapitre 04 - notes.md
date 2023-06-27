## Premier composant REACT

Un composant REACT, c'est ni plus ni moins qu'une fonction...

Ce qui est intéressant avec les composant, on va pouvoir passer des propriétés

```javascript
ReactDOM.render( <Welcome />, document.querySelector('#map'));
```

```javascript
ReactDOM.render( <Welcome name="toto" />, document.querySelector('#map'));
```


```javascript
console.log( props);
```

```javascript
Object { name: "Jean" }
```
Permet de créer des éléments qui vont être dynamique et que l'on va pouvoir réutiliser...

Lorsqu'on prend des propriétés quiio sont nécessaires, on va utiliser un objet.

```javascript
function Welcome( props) {
	return <h1>Bonjour {props.name}</h1>;
}
```

```javascript
function Welcome( props) {
	return <h1>Bonjour {props.name}</h1>;
}
```

J'utilise la destructuration, pourquoi on fait ça ?
Tout simplement parce que lorsqu'on analyse le code de cette fonction, c'est plus lisible...

Les composants vont permettre de réutiliser  au maximum votre code et créer des blocs que vous aller pouvoir conserver et utiliser de manière modulable...

1. Manière de créer les composants qui est fonctionnel
2. Autre manière qui est une structure sous forme de classe...

Les **propriétés** sont passées au niveau du **constructeur** et sont récupérable via **this.props**

Il faut nécessairement appeler **super()** pour appeler la **méthode parente** dans le constructeur...

### Notion d'état au sein d'un composant et des cycles de vie

#### Cycle de vie d'un composant
Cycle de vie d'un composant pour éviter des re render()


```javascript
// est appelée immédiatement après que le composant est monté (inséré dans l’arbre).
componentDidMount() {

}

// La méthode suivante est appelée quand un composant est retiré du DOM
componentWillUnmount() {
}
```

https://fr.reactjs.org/docs/react-component.html
