let n = 0;

function numberFormat(n) {
	return n.toString().padStart(2,'0');
}


function render() {
	const items = [
		"Tache 1",
		"Tache 2",
		"Tache 3",
		"Tache 4",
	];

	const lis = items.map( (item, k) => <li key="{k}">{item}</li>);
	const title = <div>
		<h1>
			Bonjour les gens <span>{numberFormat(n)}</span>
		</h1>

		<ul>{lis}</ul>
	</div>
	;
	//console.log(title);
	ReactDOM.render(title, document.querySelector("#map"));
}

/*
function render() {
	document.querySelector('#app').innerHTML = '<h1>Bonjour tout le monde <span>'+ n +'</span></h1>';
}
*/

/*
const title = React.createElement('h1',{},
	"Bonjour tout le monde ",
	React.createElement('span', {}, 0)
);
//console.log(title);
ReactDOM.render(title, document.querySelector("#map"));
*/

// document.querySelector('#app').innerHTML="<h1>Bonjour tout le monde</h1>";


render();

window.setInterval(() => {
	n++;
	render();
}, 1000);