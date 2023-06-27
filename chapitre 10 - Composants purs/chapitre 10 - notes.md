## Composants purs

On va parler de **l'immutabilité des composants pures** et de comment react fonctionne au niveau des renders.

Petit rappel même si on l'a déjà évoqué à chaque fois que l'on fait un setState que fait React, c'est qu'il redéclenche un rendu donc il va réappelé les fonctions dans le cadre de composants sous forme de fonctions ou dans le cadre de composants sous forme de classe il va réappelé la fonction render().

Cette fonction **render()** va créer un arbre avec la fonction **createElement()** de React et ensuite **reactDOM** pourra comparer à la version précédente pour savoir quels changements il doit effectuer.

De manière générale ces opérations se font très rapidement et ça fonctionne de manière plutôt transparente pour l'utilisateur.

Le problème c'est que parfois dans la partie render() vous allez avoir un brin de logique qui peut coûter un petit peu en termes de performance et ça peut donner un retour très mauvais au niveau de l'utilisateur.

Alors pour illustrer le problème on va reprendre le même exercice qu'on en ait fait précédemment donc le listing de produits et on va introduire un petit un petit délai au niveau du rendu...

### Pure Components

**Un composant pur** c'est un composant qui ne sera rendu que si son état où ses propriétés change.

Si un des deux éléments change ou même les deux, dans ce cas là il appelle render().

Si les éléments ne change pas dans ce cas là il ne rappelle pas les choses.

Vous pouvez utiliser des pures components de deux manières.
Si vous avez un composant sous forme de classe il suffit ici de rajouter un **extends** de **React.PureComponent**.

Si votre composants et sous forme de fonction vous pouvez le redéfinir en utilisant la fonction **React.memo()**

```javascript
function({product}) {
	const name = (product.stocked)?
		product.name:
		<span className="text-danger">{product.name}</span>;

	return <tr>
		<td >{name}</td>
		<td >{product.price}</td>
	</tr>;
}

const ProductRow = React.memo( ProductRowComponent);
```

```javascript
const ProductRow = React.memo( function({product}) {
	const name = (product.stocked)?
		product.name:
		<span className="text-danger">{product.name}</span>;

	return <tr>
		<td >{name}</td>
		<td >{product.price}</td>
	</tr>;
});
```

Finalement est-ce que je ne devrais pas rendre tous mes composants sous forme de pure convenance ça me permettrait d'optimiser les performances de manière générale ?

Alors pas forcément :
1. Premièrement il faut savoir que lorsque vous utilisez un **pureComponent** vous allez demander à React sous certaines conditions de ne pas rendre les choses et parfois vous pourriez avoir des bugs avec des rendus que vous attendriez qui ne se font pas et on va avoir quelques exemples de problème juste après...
2. L'autre chose c'est que maintenant à chaque fois qu'il doit rendre ce composant il doit faire une comparaison, si vous avez beaucoup de propriétés beaucoup d'états cette comparaison peut avoir un coût.

Donc on réservera l'utilisation de composants pur vraiment pour des éléments qui sont importants et qui ont peut-être une logique complexe et pour lesquels on connait les conditions de rendu.

Ça nous amène justement à une seconde problématique qui est la notion dite de **immutabilité**, Lorsque on va travailler avec des composants purs, il faudra bien faire attention à ce que les propriétés changent !






Dans ce chapitre nous allons voir l'impact que peut avoir un rendu et comment optimiser les composants qui contiennent une logique complexe. Lorsqu'un changement d'état est opéré sur un composant, sa fonction `render()` est appelée et l'ensemble des sous composant sont rendu à nouveau.

Il est cependant possible de mémoriser le rendu d'un élément afin d'éviter les rendu consécutif si ses propriétés et son état n'a pas changé depuis le dernier rendu.

Il existe 2 méthodes pour "mémoiser" un composant :


