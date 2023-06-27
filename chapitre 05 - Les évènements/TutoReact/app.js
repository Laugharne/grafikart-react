function WelcomeFunc( {name, children}) {
	//console.log( props);
	//return <h1>Bonjour {name}</h1>;
	return <div>
		<h1>Bonjour {name}</h1>
		<p>
			{children}
		</p>
	</div>;
}


class Welcome extends React.Component {
/*
	constructor( props) {
		super( props);	// Il faut nécessairement appeler super()
						// pour appeler la méthode parente...
		console.log( props);
	}
*/
	render() {
		return <div>
			<h1>Bonjour {this.props.name}</h1>
			<p>
				{this.props.children}
			</p>
		</div>;
	}
}


class Clock extends React.Component {

	// on aborde ici les états !!!
	// ---------------------------
	constructor( props) {
		super( props);	// Il faut nécessairement appeler super()
						// pour appeler la méthode parente...
		//console.log( props);
		this.state = {
			date: new Date(),	// valeur par défaut
		};
		this.timer = null;	// pas de timer au début !
	}

	// quand le composant a été monté, on créer un nouveau timer
	componentDidMount() {
		this.timer = window.setInterval( this.tick.bind(this), 1000);	// toute les secondes (1000 ms)
	}

	// quand un composant est supprimé
	componentWillUnmount() {
		window.clearInterval( this.timer);
	}

	// change l'état d'un composant
	tick() {
		this.setState({date: new Date()});
	}

	render() {
		//-const date = new Date();
		return <div>
			Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
		</div>
	}
}


class Incrementer extends React.Component {

	constructor( props) {
		super( props);	// Il faut nécessairement appeler super()
						// pour appeler la méthode parente...
		//console.log( props);
		this.state = {
			value: props.start,   // valeur par défaut
			step : props.step,
			pause: false,
		};
		this.reset  = this.reset.bind(this);
		this.toggle = this.toggle.bind(this);

		this.timer = null;	// pas de timer au début !
	}

	// quand le composant a été monté, on créer un nouveau timer
	componentDidMount() {
		this.play();//this.timer = window.setInterval( this.tick.bind(this), 1000);	// toute les secondes (1000 ms)
	}

	// quand un composant est supprimé
	componentWillUnmount() {
		this.pause();//window.clearInterval( this.timer);
	}

	play() {
		this.timer = window.setInterval( this.tick.bind(this), 1000);	// toute les secondes (1000 ms)
	}

	pause() {
		window.clearInterval( this.timer);
	}

	// change l'état d'un composant
	tick() {
		//this.setState({value: this.state.value+1});
		this.setState( ( state, props) => {
			return {value: state.value+state.step};
		});
		// ^ version plus optimale, car React fait des optimisations et donc des problèmes
		// si setState() consécutifs qui sont appelé
	}

	reset() {
		//this.setState({value: this.state.value+1});
		this.setState( ( state, props) => {
			return {value: props.start};
		});
	}

	render() {
		let label = (this.state.pause == false)? " ⏸︎ Pause": " ⏵︎ Play";
		return <div>
			Value = {this.state.value} &nbsp;
			<button onClick={this.toggle}>{label}</button>
			&nbsp;
			<button onClick={this.reset}>R.A.Z.</button>
		</div>
	}

	toggle( e) {
		if( this.state.pause == false) {
			this.componentWillUnmount();
		} else {
			this.componentDidMount();
		}
		this.setState( ( state, props) => {
			return {pause: !state.pause};
		});
	}

}
Incrementer.defaultProps = {
	start: 0,   // valeur par défaut de start !
	step : 1,   // valeur par défaut de step !
}


/*
class ManualIncrementer extends React.Component {

	constructor( props) {
		super( props);
		this.state = {n: 0};
	}

	render() {
		return <div>
			Valeur = {this.state.n} <button onClick={this.increment.bind(this)}>Incrémenter</button>
		</div>;
	}

	increment( e) {
		e.preventDefault();	// permet d'annuler comportement par défaut ??
							// utile si au lieu d'avoir un bouton, on avait un lien qui pointrait vers un site
		this.setState( ( state, props) => {
			return {n: state.n+1};
		});
	}

}
*/

function Home() {
	return <div>
		<Welcome name="Franck" />
		<Welcome name="Julie" />
		<Incrementer />
	</div>;
}

//ReactDOM.render( <Welcome name="Jean" />, document.querySelector('#map'));
//ReactDOM.render( <Welcome name="Jean">Bonjour tout le monde</Welcome>, document.querySelector('#map'));
ReactDOM.render( <Home />, document.querySelector('#map'));
