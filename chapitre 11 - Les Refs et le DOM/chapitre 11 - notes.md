## Les réfèrences et le DOM

Comme on l'a vu depuis le début de cette formation React offre une couche d'abstraction qui permet de ne plus se soucier du DOM.

Cependant on a parfois besoin d’interagir avec le DOM et on a besoin d'une mécanique pour récupérer un élément dans le DOM.

Le système de **refs** va permettre de récupérer un élément (DOM) dans notre composant.


```javascript
class Home extends React.Component {

	constructor(props) {
		super( props);
		this.handleClick = this.handleClick.bind( this);
		this.input = null;
	}

	handleClick( e) {
		console.log( this.input.value);
	}

	render() {

		return <div>
			<input type="text" ref={(ref) => this.input = ref }/>
			<button onClick={this.handleClick}>Tester</button>
		</div>;
	}

}

ReactDOM.render(<Home />, document.getElementById('app'));
```

```javascript
class Home extends React.Component {

	constructor(props) {
		super( props);
		this.handleClick = this.handleClick.bind( this);
		this.input = React.createRef();
	}

	handleClick( e) {
		console.log( this.input.current.value);
	}

	render() {

		return <div>
			<input type="text" ref={this.input}/>
			<button onClick={this.handleClick}>Tester</button>
		</div>;
	}

}

ReactDOM.render(<Home />, document.getElementById('app'));
```

Donc si vous faites des manipulations ça peut entrer en collision avec les manipulations qui sont normalement fait par React.

Alors pourquoi on va utiliser ça ?  Il ya deux situations et deux situations seulement qui justifient l'utilisation de référence.

1. La première situation s'est tout simplement si vous avez des champs non contrôlés et que vous voulez récupérer la valeur par exemple ou l'altérer.  Dans ce cas là ça ne pose aucun problème parce que ce champ là n'a pas de **value** donc n'est pas marqué comme contrôlé par React donc React s'attend à ce que vous le modifier par un autre moyen.
2. L'autre raison c'est si jamais vous avez besoin de brancher des composants qui sont externes à React, par exemple vous avez une librairie javascript qui crée un date picker pour un champ, vous avez envie d'utiliser cette librairie javascript, vous pourrez utiliser le compodidMount() pour rajouter votre comportement est le componentWillUnmount() pour retirer la librairie javascript.  Donc ça peut être intéressant pour faire communiquer des librairies qui ne sont pas forcément pensé pour React dans React !
1. 

### Comment on fait descendre des informations et descendre la réfèrence

**React.forwardRef()** est quelque chose qui va permettre de transférer la référence et de l'amener un élément particulier.

Donc l'idée c'est de dire lorsque je fais ref ici, sur ce champ là, en fait moi j'aimerais bien que la référence pointe vers l'input qui se situe au niveau de mon composant <field /> donc pour cela lorsqu'on a une fonction, on va utiliser la fonction **React.forwardRef()** et le résultat de cette fonction on va l'appeler tout simplement **Field**


```javascript
const Field = React.forwardRef( function (props, ref) {
	return <div className="form-group">
		<input type="text" className="form-control" ref={ref}/>
	</div>;
});


class Home extends React.Component {

	constructor(props) {
		super( props);
		this.handleClick = this.handleClick.bind( this);
		this.input = React.createRef();
	}

	handleClick( e) {
		console.log( this.input.current.value);
	}


	render() {
		console.log( this.input);
		return <div>
			<Field ref={this.input}/>
			<button onClick={this.handleClick}>Tester</button>
		</div>;
	}

}


ReactDOM.render(<Home />, document.getElementById('app'));
```

Maintenant avec une classe au lieu d'une fonction pour le composant

```javascript
class Field extends React.Component {

	render() {
		return <div className="form-group">
			<input type="text" className="form-control" ref={this.props.forwardRef}/>
		</div>;
	}

}

const FieldWithRef = React.forwardRef((props, ref) => {
	return <Field forwardRef={ref} />;
});


class Home extends React.Component {

	constructor(props) {
		super( props);
		this.handleClick = this.handleClick.bind( this);
		this.input = React.createRef();
	}

	handleClick( e) {
		console.log( this.input.current.value);
	}


	render() {
		console.log( this.input);
		return <div>
			<FieldWithRef ref={this.input}/>
			<button onClick={this.handleClick}>Tester</button>
		</div>;
	}

}

ReactDOM.render(<Home />, document.getElementById('app'));
```

```javascript
class Field extends React.Component {

	render() {
		return <div className="form-group">
			<label htmlFor="">{this.props.label}</label>
			<input type="text" className="form-control" ref={this.props.forwardRef}/>
		</div>;
	}

}

const FieldWithRef = React.forwardRef((props, ref) => {
	return <Field forwardRef={ref} {...props}/>;
});


class Home extends React.Component {

	constructor(props) {
		super( props);
		this.handleClick = this.handleClick.bind( this);
		this.input = React.createRef();
	}

	handleClick( e) {
		console.log( this.input.current.value);
	}


	render() {
		console.log( this.input);
		return <div>
			<FieldWithRef ref={this.input} label="Label"/>
			<button onClick={this.handleClick}>Tester</button>
		</div>;
	}

}


ReactDOM.render(<Home />, document.getElementById('app'));
```

Donc ce qu'il faut retenir c'est vraiment ces deux fonctions **React.createRef** permet de créer un objet qui a une clef courante qui va contenir la référence que l'on souhaite utiliser, ensuite si on souhaite stocker la référence vers un élément dans le DOM il suffit simplement de rajouter un attribut **ref** et mettre la valeur qui est associés.

Si jamais on veut faire descendre à référence dans un composant il faudra utiliser la méthode **forwardRef** qui est une fonction d'ordre supérieur et qui prendra en paramètre les propriétés et la référence.  Et ce sera ensuite aux composants qui sera à l'intérieur de ce callback de définir à quel élément sera associée la référenc.  Ensuite ça vous permet de manipuler directement les éléments où vous le souhaitez, soit lors d'événements ce soit lors du montage ou du démontage d'un élément.

Faite attention par contre vous n'avez aucune garantie que cet élément là sera disponible, par exemple ce qui peut se passer c'est que l'élément serait masqué ou ne serait pas afficher et dans ce cas-là **curren** redeviendrait **null**.

Donc si jamais vous avez des conditions sur l'affichage du champ pensez à vérifier que la valeur est bien un input ou un élément dans le DOM avant de faire un quelconque traitement...

Tous cela n'est utile que dans deux situations :
1. Quand vous avez des champs non contrôlés
2. Lorsque vous avez des librairies externe que voulait faire communiquer avec React

