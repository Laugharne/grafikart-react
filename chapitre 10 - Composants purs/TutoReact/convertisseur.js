const unitNames = {
	c: 'Celsius',
	f: 'Fahrenheit',
}


function toCelsius( fahrenheit) {
	return (fahrenheit - 32) * 5/9;
}

function toFahrenheit( celsius) {
	return (celsius * 9/5) +32;
}

function tryConvert( temperature, convert) {
	const value = parseFloat( temperature);
	if( Number.isNaN( value)) {
		return '';
	}

	const output = Math.round( convert( value) * 100) / 100;
	return output.toString();
}



class BoilingVerdict extends React.Component {

	render() {
		const {celsius} = this.props;

		if( celsius >= 100) {
			return <div className="alert alert-success">
				L'eau bout !
			</div>;
		}
		return <div className="alert alert-info">
			L'eau ne bout pas !
		</div>;
	}

}


class TemperatureInput extends React.Component {

	constructor( props) {
		super( props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange( e) {
		//console.log( e);
		/*
		const value = e.target.value;
		this.setState({
			temperature: value
		});
		*/
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		//const unit        = this.props.unit;
		//const temperature = this.props.value;
		const {unit, temperature} = this.props;
		const unitName = unitNames[unit];
		const name     = 'unit' + unit;

		return <div className="form-group">
			<label htmlFor={name}>Température (en {unitName}) : </label>
			<input type="text" value={temperature} onChange={this.handleChange} id={name} name={name} className="form-control" />
		</div>
	}
}


function Button({type, children})  {
	const className = "btn btn-" + type;
	return <button className={className}>{children}</button>;
}


function PrimaryButton({children})  {
	return <button className="btn btn-primary">{children}</button>;
}


function SecondaryButton({children})  {
	return <button className="btn btn-secondary">{children}</button>;
}


function Column2({left, right})  {
	return <div className="row">
		<div className="col-md-6">{left}</div>
		<div className="col-md-6">{right}</div>
	</div>;
}


class Calculator extends React.Component {

	constructor( props) {
		super( props);
		this.state = {
			unit       : 'c',
			temperature: 20,
		};
		//this.handleChange = this.handleChange.bind(this);
		//this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
		
		this.handleCelsiusChange    = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
	}

/*
	handleChange( e) {
		//console.log( e);
		const value = e.target.value;
		this.setState({
			temperature: value
		});

	}
*/

	handleCelsiusChange( temperature) {
		this.setState({
			unit       : 'c',
			temperature: temperature,
		});
	}

	handleFahrenheitChange( temperature) {
		this.setState({
			unit       : 'f',
			temperature: temperature,
		});
	}


	render() {
		//console.log(this.props);
		const {
			temperature,
			unit,
		} = this.state;

		//const celsius       = temperature;
		//const fahrenheit    = toFahrenheit( celsius);

		const celsius    = (unit === 'c')? temperature: tryConvert( temperature, toCelsius);
		const fahrenheit = (unit === 'f')? temperature: tryConvert( celsius, toFahrenheit);
		//const celsius    = (unit === 'c')? temperature: toCelsius(temperature);
		//const fahrenheit = (unit === 'f')? temperature: toFahrenheit( celsius);

		return <div>
			<Column2
				left  = {<TemperatureInput unit    = "c" temperature = {celsius}    onTemperatureChange = {this.handleCelsiusChange}/>}
				right = {<TemperatureInput unit    = "f" temperature = {fahrenheit} onTemperatureChange = {this.handleFahrenheitChange}/>}
			/>
			<BoilingVerdict   celsius = {parseFloat(celsius)} />

			<PrimaryButton>Envoyer</PrimaryButton>
			<SecondaryButton>Envoyer</SecondaryButton>
		</div>;
	}
	
}


class App extends React.Component {

	render() {
		return <div>
			<Calculator />
		</div>;
	}
}


ReactDOM.render( <App />, document.querySelector('#app'));
