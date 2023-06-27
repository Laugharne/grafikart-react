### JSX

https://babeljs.io

```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Salut {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Thierry" />,
  document.getElementById('hello-example')
);
```

```javascript
class HelloMessage extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Salut ",
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: "Thierry" }), document.getElementById('hello-example'));
```



https://fr.reactjs.org/docs/add-react-to-a-website.html

```javascript
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```javascript

N'est utile **QUE** pour le développement, pas rapide et utile en prod !!!!

```javascript
	const title = <h1>
		Bonjour les gens <span>{n}</span>
	</h1>;
```
à l'intérieur des parenthèses, uniquement du code JavaScript valide (expression, etc... y compris une fonction)

**ATTENTION**

Particularitén dans le cas de l'utilisation des classes au sein de JSX
Utiliser **className** au lieu de **class**, car class est un mot clef JavaScript !

dans le cas des id utiliser **id={"title" + n}** au lieu de **id=title{n}**

Un **JSX** valide n'a qu'un seule racine

**<> + </>** Ne marche pas selon les versions de **Babel**

**<React.Fragment>**, utile dans React lorsqu'on souhaite créer plusieurs éléments sans forcément qu'il y ai une racine définie...

