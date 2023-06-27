let n = 0;

function render() {
	const title = React.createElement('h1',{},
		"Bonjour tout le monde ",
		React.createElement('span', {}, n)
	);
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