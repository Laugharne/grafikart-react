## Les formulaires

Les formulaires un peu particulier dans le cas du DOM classique, il sont capable de maintenir eux-même leur propre état.

C'est à dire que lorsque l'on va taper quelque chose dans un champ on a une propriété **value** qui permet de persister l'information qui a été tapée. Or avec REACT on l'a vu REACT à sa propre manière via le système de **state** de gérer son état donc il va falloir demander à react de contrôler les choses.


```javascript
render() {
	return <div>
		<label htmlFor="nom">Mon nom</label> :&nbsp;
		<input type="text" id="nom" name="nom" value={this.state.nom}/>
	</div>;
}
```

Vous allez remarquer quelque chose d'un petit peu étrange donc on voit bien que notre champ à ce nom là, par contre lorsque vous essayez de taper une valeur dans ce champ rien ne se passe tout simplement parce que maintenant que vous avez défini une valeur ce champ va être contrôlé par react, donc react va s'assurer que la valeur qui est dans le champ correspond à ce que vous avez mis dans le JSX.

Le problème c'est que là vous n'avez aucun moyen de changer le nom et c'est pour ça que ce chanp devient complètement bloquée.

Du coup il va falloir définir un événement qui va permettre de gérer les changements donc cet événement c'est l'événements **onChange**


**Petite subtilité** les textarea ne prennent pas des enfants comme on pourrait l'attendre dans le cadre de l'HTML classique mais ça prend une valeur

```javascript
handleChange( e) {
	this.setState({
		nom: e.target.value
	});
}


render() {
	return <div>
		<label htmlFor="nom">Mon nom</label> :&nbsp;
		<textarea id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}></textarea>
	</div>;
}
```

**Dans le cas du select**

```javascript
constructor( props) {
	super( props);
	this.state = {
		nom: "demo2"
	};
	this.handleChange = this.handleChange.bind(this);
}

render() {
	return <div>
		<label htmlFor="nom">Mon nom</label> :&nbsp;
		<select value={this.state.nom} onChange={this.handleChange}>
			<option value="demo1">Demo 1</option>
			<option value="demo2">Demo 2</option>
			<option value="demo3">Demo 3</option>
		</select>
	</div>;
}
```

**Dans le cas du select multiple**

```javascript
constructor( props) {
	super( props);
	this.state = {
		nom: ["demo2", "demo1]
	};
	this.handleChange = this.handleChange.bind(this);
}

handleChange( e) {
	this.setState({
		nom: Array.from( e.target.selectedOptions).map(o => o.value)
	});
}

render() {
	return <div>
		<label htmlFor="nom">Mon nom</label> :&nbsp;
		<select value={this.state.nom} onChange={this.handleChange} multiple>
			<option value="demo1">Demo 1</option>
			<option value="demo2">Demo 2</option>
			<option value="demo3">Demo 3</option>
		</select>
	</div>;
}
```

**Les champs de type radio ou Checkbox**

```javascript
constructor( props) {
	super( props);
	this.state = {
		checked: true
	};
	this.handleChange = this.handleChange.bind(this);
}

handleChange( e) {
	this.setState({
		checked: e.target.checked
	});
}

render() {
	return <div>
		<label htmlFor="nom">Mon nom</label> :&nbsp;
		<input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
	</div>;
}
```

**Type "file"**

Enfin le dernier type de champ que l'on peut être amené à rencontrer ces les champs de **type fichiers** donc ces champs là ne peuvent pas être contrôlés par REACT parce que les informations qui sont dans le champ ne sont disponibles en lecture seule.

Il n'est pas possible pour React de modifier la valeur d'un input de type file.

Donc par défaut si vous avez un input de type fichier  vous pourrez greffer des événements dessus, par contre vous ne pouvez pas changer sa valeur dynamiquement depuis React ce n'est pas possible.

Mais dans tous les cas ce n'est pas possible en javascript de base non plus !


**Champs multiples**

```javascript
class Home extends React.Component {

	constructor( props) {
		super( props);
		this.state = {
			nom       : '',
			prenom    : '',
			newsletter: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange( e) {
		const name  = e.target.name;
		const type  = e.target.type;
		const value = (type == "checkbox")? e.target.checked: e.target.value;
		this.setState({
			[name]: value
		});
	}


	render() {
		return <div>
			<div>
				<label htmlFor="nom">Nom</label> :&nbsp;
				<input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}/>
			</div>
			<div>
				<label htmlFor="prenom">Prénom</label> :&nbsp;
				<input type="text" id="prenom" name="prenom" value={this.state.prenom} onChange={this.handleChange}/>
			</div>
			<div>
				<label htmlFor="newsletter">S'abonner à la newsletter ?</label> :&nbsp;
				<input type="checkbox" id="newsletter" name="newsletter" checked={this.state.newsletter} onChange={this.handleChange}/>
			</div>
			{JSON.stringify(this.state)}
		</div>;
	}

}



ReactDOM.render( <Home />, document.querySelector('#app'));

```
Maintenant un petit détail important on va mettre au niveau du render() un console.log à chaque fois que vous tapez quelque chose dans un champ.

Il faut bien comprendre que savard déclencher un rendu c'est à dire que à chaque fois que vous faites un changement et il appelle un setState() donc logiquement le composant et re-rendus.

Donc là on a une logique qui est assez simple mais il faut bien comprendre que ça demande du travail au niveau de React, à chaque fois que vous faites quelque chose dans un champ ce qui peut me poser un problème en terme de performance.

Donc si vous n'avez pas forcément besoin de traquer l'état de votre champ au niveau de React, par exemple vous avez un champ et vous n'avez besoin de la valeur que lorsque on soumet le formulaire ce n'est pas forcément utile de traquer les choses.

Donc là on se demande à créer c'est ce qu'on appelle des champs contrôlés mais vous avez la possibilité de créer des champs non contrôlés.

```javascript
<input type="text" value={null} />
```
Avec une **value** à **null** ou **undefined**, le champ ne sera pas controlé par React


```javascript
<input type="text" defaultValue="toto" />
```
Là on peut mettre une valeur ou une expression valide React, sans être controlé par React !

Donc si vous avez besoin de suivre les modifications qui sont faites au niveau de l'état on utilisera des champs contrôle et donc il faudra nécessairement avoir un **value** et un **onChange** associés.

Si vous voulez avoir des champs qui ne nécessitent pas forcément d'être contrôlée par React il vous suffit de ne pas mettre de valeur et d'utiliser **defaultValue** 
si vous voulez mettre une valeur initiale.

Donc si par exemple vous générez un formulaire et le formulaire sera soumis de manière classique ce n'est pas forcément pertinent de traquer les valeurs par React, en revanche si par exemple à chaque fois que l'utilisateur tape quelque chose vous voulez valider les données au niveau de votre composants et faire peut-être des traitements dans ce cas là c'est plus intéressant d'avoir des champs contrôlés.



```javascript
class Home extends React.Component {

	constructor( props) {
		super( props);
		this.state = {
			nom       : '',
			prenom    : '',
			newsletter: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange( e) {
		const name  = e.target.name;
		const type  = e.target.type;
		const value = (type == "checkbox")? e.target.checked: e.target.value;
		this.setState({
			[name]: value
		});
	}


	render() {
		console.log('render');
		return <div>
			<div>
				<label htmlFor="nom">Nom</label> :&nbsp;
				<input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}/>
			</div>
			<div>
				<label htmlFor="prenom">Prénom</label> :&nbsp;
				<input type="text" id="prenom" name="prenom" value={this.state.prenom} onChange={this.handleChange}/>
			</div>
			<div>
				<label htmlFor="newsletter">S'abonner à la newsletter ?</label> :&nbsp;
				<input type="checkbox" id="newsletter" name="newsletter" checked={this.state.newsletter} onChange={this.handleChange}/>
			</div>
			<input type="text" defaultValue="toto" />
			{JSON.stringify(this.state)}
		</div>;
	}

}



ReactDOM.render( <Home />, document.querySelector('#app'));
```

**Composants dédiées + Bootstrap**

https://getbootstrap.com/docs/4.6/getting-started/introduction/

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>REACT - GRAFIKART</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
	<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js" defer></script>
	<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" defer></script>
	<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
	<script src="app.js" defer type="text/babel"></script>
</head>
<body>
	<div id="app"></div>	
</body>
</html>
```

```javascript
/*
class Field extends React.Component {

	render() {
		const {name, value, onChange, children} = this.props;
		return <div className="form-group">
			<label htmlFor={name}>{children}</label>
			<input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
		</div>;
	}
}
*/

function Field ({name, value, onChange, children}) {
	return <div className="form-group">
		<label htmlFor={name}>{children}</label>
		<input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
	</div>;
}

function Checkbox ({name, value, onChange, children}) {
	return <div className="form-check">
		<input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input" />
		<label htmlFor={name} className="form-check-label">{children}</label>
	</div>;
}


class Home extends React.Component {

	constructor( props) {
		super( props);
		this.state = {
			nom       : '',
			prenom    : '',
			newsletter: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange( e) {
		const name  = e.target.name;
		const type  = e.target.type;
		const value = (type === "checkbox")? e.target.checked: e.target.value;
		this.setState({
			[name]: value
		});
	}


	render() {
		return <div className="container">
			<Field name = "nom" value = {this.state.nom} onChange        = {this.handleChange}>Nom</Field>
			<Field name = "prenom" value = {this.state.prenom} onChange     = {this.handleChange}>Prénom</Field>
			<Checkbox name = "newsletter" value = {this.state.newsletter} onChange     = {this.handleChange}>Newsletter</Checkbox>
			{JSON.stringify(this.state)}
		</div>;
	}

}


ReactDOM.render( <Home />, document.querySelector('#app'));
```

**Bouton d'envoi du formulaire**

```javascript

function Field ({name, value, onChange, children}) {
	return <div className="form-group">
		<label htmlFor={name}>{children}</label>
		<input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
	</div>;
}

function Checkbox ({name, value, onChange, children}) {
	return <div className="form-check">
		<input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input" />
		<label htmlFor={name} className="form-check-label">{children}</label>
	</div>;
}


class Home extends React.Component {

	constructor( props) {
		super( props);
		this.state = {
			nom       : '',
			prenom    : '',
			newsletter: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange( e) {
		const name  = e.target.name;
		const type  = e.target.type;
		const value = (type === "checkbox")? e.target.checked: e.target.value;
		this.setState({
			[name]: value
		});
	}

	handleSubmit( e) {
		e.preventDefault();
		const data = JSON.stringify(this.state);
		console.log(data);
	}


	render() {
		return <form className="container" onSubmit={this.handleSubmit}>
			<Field name = "nom" value = {this.state.nom} onChange        = {this.handleChange}>Nom</Field>
			<Field name = "prenom" value = {this.state.prenom} onChange     = {this.handleChange}>Prénom</Field>
			<Checkbox name = "newsletter" value = {this.state.newsletter} onChange     = {this.handleChange}>Newsletter</Checkbox>
			<div className="form-group">
				<button className="btn btn-primary">Envoyer</button>
			</div>
			{JSON.stringify(this.state)}
		</form>;
	}

}



ReactDOM.render( <Home />, document.querySelector('#app'));

```
