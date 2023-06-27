## Les évènements

Incrémenteur mais non automatique, mais en utilisant un bouton



```javascript
	increment( e) {
		console.log(e);
		this.setState( ( state, props) => {
			return {n: state.n+1};
		});
	}
```

```javascript
Object { dispatchConfig: {…}, _targetInst: {…}, _dispatchListeners: BoundFunctionObject, _dispatchInstances: {…}, nativeEvent: click, type: "click", target: button, currentTarget: button, eventPhase: 3, bubbles: true, … }
app.js:132:10
```

**Synthetic event**, propre à **React**

https://fr.reactjs.org/docs/events.html

Classe qui va enrober les évènements classiques, lorsqu'on travaille avec React, on peut cibler les différents contextes, ici on travaille avec le DOM, mais si on fait du React Native, on va travailler avec les éléments natifs.
Cette surcouche permet d'avoir une API générique quelque soit la cible que vous utilisez pour vos composants React. Et donc pourrait fonctionner avec du DOM que du natif...
