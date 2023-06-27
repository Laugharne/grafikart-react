## chapitre 2

https://fr.reactjs.org

### Liens CDN

https://fr.reactjs.org/docs/cdn-links.html

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

React DOM va permettre de "brancher" les éléments React à notre page web

Dev Web --> combo React + ReactDOM

Dev App native --> combo React + ReactNative


### Live Server

ctrl+shift+p --> Live : Open with live server



```javascript
Object { "$$typeof": Symbol("react.element"), type: "h1", key: null, ref: null, props: {…}, _owner: null, _store: {…}, … }
​
"$$typeof": Symbol("react.element")
​
_owner: null
​
_self: null
​
_source: null
​
_store: Object { … }
​
key: null
​
props: Object { children: "Bonjour tout le monde" }
​
ref: null
​
type: "h1"
​
<prototype>: Object { … }
app.js:3:9
```

React va être capable de détecter que à chaque fois qu'on fait un render() la seule chose qu'il va devoir modifié, c'est le contenu de notre <span>

Les éléments de React représentent un Virtual DOM
