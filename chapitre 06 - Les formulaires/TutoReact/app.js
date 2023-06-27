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
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange( e) {
		//console.log(e);
		const name  = e.target.name;
		const type  = e.target.type;
		const value = (type === "checkbox")? e.target.checked: e.target.value;
		this.setState({
			[name]: value
		});

		/*
		this.setState({
			checked: e.target.checked
		});
		*/
		/*
		this.setState({
			nom: Array.from( e.target.selectedOptions).map(o => o.value)
		});
		*/
		/*
		handleChange( e) {
			this.setState({
				nom: e.target.value
			});
		}
		*/
	}

	handleSubmit( e) {
		e.preventDefault();
		const data = JSON.stringify(this.state);
		console.log(data);
	}


	render() {
		//console.log('render');
		return <form className = "container" onSubmit = {this.handleSubmit}>
			<Field    name            = "nom" value          = {this.state.nom} onChange        = {this.handleChange}>Nom</Field>
			<Field    name            = "prenom" value       = {this.state.prenom} onChange     = {this.handleChange}>Prénom</Field>
			<Checkbox name            = "newsletter" value   = {this.state.newsletter} onChange = {this.handleChange}>Newsletter</Checkbox>
			<div      className       = "form-group">
				<button   className   = "btn btn-primary">Envoyer</button>
			</div>
			{JSON.stringify(this.state)}
		</form>;

	/*
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
	*/

	/*
		return <div>
			<label htmlFor="nom">Mon nom</label> :&nbsp;
			<select value={this.state.nom} onChange={this.handleChange} multiple>
				<option value="demo1">Demo 1</option>
				<option value="demo2">Demo 2</option>
				<option value="demo3">Demo 3</option>
			</select>
		</div>;
	*/

	/*
		return <div>
			<label htmlFor="nom">Mon nom</label> :&nbsp;
			<textarea id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}></textarea>
		</div>;
	*/

	/*
		return <div>
			<label htmlFor="nom">Mon nom</label> :&nbsp;
			<input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}/>
		</div>;
	*/
	}

}



ReactDOM.render( <Home />, document.querySelector('#app'));
