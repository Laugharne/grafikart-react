 const PRODUCTS = [
	{category: "Sporting Goods",	price: "$49.99",	stocked: true,	name: "Football"},
	{category: "Sporting Goods",	price: "$9.99",		stocked: true,	name: "Baseball"},
	{category: "Sporting Goods",	price: "$29.99",	stocked: false,	name: "Basketball"},
	{category: "Electronics",		price: "$99.99",	stocked: true,	name: "iPod Touch"},
	{category: "Electronics",		price: "$399.99",	stocked: false,	name: "iPhone 5"},
	{category: "Electronics",		price: "$199.99",	stocked: true,	name: "Nexus 7"}
  ];



/* BLEU */
class SearchBar extends React.Component {
	constructor( props) {
		super( props);
		
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange    = this.handleInStockChange.bind(this);
	}


	handleFilterTextChange( e) {
		this.props.onFilterTextChange( e.target.value);
	}

	handleInStockChange( e) {
		this.props.onInStockChange( e.target.checked);
	}


	render() {
		const {filterText, inStockOnly} = this.props;
		return <div className="mb-3">
			<div className="form-group mb-0">
				<input type="text" value={filterText} onChange={this.handleFilterTextChange} id="search" name="search" className="form-control" placeholder="Searching..." />
			</div>
			<div className="form-check">
				<input type="checkbox" checked={inStockOnly} onChange={this.handleInStockChange} id="stock" name="stock" className="form-check-input" />
				<label htmlFor="stock" className="form-check-label">Only show products in stock</label>
			</div>
		</div>;
	}
}


/* TURQUOISE */
class ProductCategoryRow extends React.Component {

	render() {
		const {category} = this.props;
		return <tr>
			<th colSpan="2">{category}</th>
		</tr>;
	}
}


/* ROUGE */
class ProductRow extends React.Component {

	render() {
		const {product} = this.props;
		const name      = (product.stocked)?
			product.name:
			<span className="text-danger">{product.name}</span>;

		return <tr>
			<td >{name}</td>
			<td >{product.price}</td>
		</tr>;
	}
}

/* VERT */
class ProductTable extends React.Component {

	render() {
		const {products, inStockOnly, filterText} = this.props;

		const rows         = [];
		let   lastCategory = null;

		products.forEach( product => {
			if( inStockOnly === true && product.stocked === false) { return;}
			if( product.name.indexOf(filterText) === -1) { return;}

			if(product.category !== lastCategory) {
				lastCategory = product.category;
				rows.push(<ProductCategoryRow key={lastCategory} category={lastCategory} />);
			}
			rows.push(<ProductRow key={product.name} product={product}/>);
			// on rajoute "key" car en React chaque enfant doit avoir une clef !!!!!
			// Afin de ne pas ré écraser tout l'arbre et seulement le(s) élément(s) qui a(ont) changé(s)
			// dès qu'on lui passe un tableau d'éléments, il faut que chaque élément ai une clef distincte et unique
			// Sinon il y aura un WARNING
		});

		return <table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
		</table>;
	}
}

/* ORANGE */
class FilterableProductTable extends React.Component {

	constructor( props) {
		super( props);
		this.state = {
			filterText : '',
			inStockOnly: false,
		};
		
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange    = this.handleInStockChange.bind(this);
	}


	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}

	handleInStockChange(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		});
	}

	render() {
		const {products} = this.props;
		return <React.Fragment>
			{/*JSON.stringify(this.state)*/}
			<SearchBar
				filterText         = {this.state.filterText}
				inStockOnly        = {this.state.inStockOnly}
				onFilterTextChange = {this.handleFilterTextChange}
				onInStockChange    = {this.handleInStockChange}
			/>
			<ProductTable
				products    = {PRODUCTS}
				filterText  = {this.state.filterText}
				inStockOnly = {this.state.inStockOnly}
			/>
		</React.Fragment>;
	}
}


class App extends React.Component {

	render() {
		return <div className="container">
			<FilterableProductTable products={PRODUCTS} />
		</div>;
	}
}


ReactDOM.render( <App />, document.querySelector('#app'));
