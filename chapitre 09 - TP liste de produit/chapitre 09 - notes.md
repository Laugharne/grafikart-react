## TP : Liste de produit

https://fr.reactjs.org/docs/thinking-in-react.html

1. un composant quii va être le formulaire de recherche (filtrage)
2. une liste des produits
	1. un composant qui va afficher les catégories
	2. un composant qui va afficher individuellement chacun des produits
  
Déterminer quels composants vont avoir un état interne et ceux qui vont recevoir des propriétés ?

Un état principal qui va être la liste des produits, le copmposant qui va être responsable, c'est le composant principal

Le composant formulaire il a uniquement besoin de savoir quand on va changer le filtre de recherche et quand on va cocher ou non la case
Il recevra donc uniquement des propriétés et il fera remonter le filtre et l'état de la case au composant parent

Le composant catégorie on va juste lui passer des propriétés, (la listed des produits et les différents filtres à appliquer)

![](S%C3%A9lection_003.png)

Vous pouvez voir que nous avons cinq composants dans notre petite appli. Nous avons mis en italiques les données que chaque composant représente.

1. **FilterableProductTable** (orange) : contient l’intégralité de l’exemple
2. **SearchBar** (bleu) : reçoit toutes les données saisies par l’utilisateur
3. **ProductTable** (vert) : affiche et filtre la collection de données en fonction des données saisies par l’utilisateur
4. **ProductCategoryRow** (turquoise) : affiche un titre pour chaque catégorie
5. **ProductRow** (rouge) : affiche une ligne pour chaque produit


L'objectif de cet exercice c'est de vous montrer comment va s'opérer la communication avec react c'est très important on va essayer de décomposer notre structure en différents composants pour pouvoir travailler plus simplement.

On pourrait ce ne serait pas forcément très efficace, mais ne créer qu'un seul composant qui contiendrait toute la logique.  Le problème c'est que ça deviendrait très compliqué et si on a des petits changements à faire.

Mais ça devient assez à ces problématiques donc on va essayer lorsque l'on à une nouvelle problématique avec React de décomposer les choses en composants et ensuite on va réfléchir ou est-ce que l'on place l'état et comment les choses communique les unes avec les autres donc c'est toujours le comportement qu'il faudra avoir.

D'abord on réfléchit quels composants on va créer, quels sont les éléments qui composent notre interface.

Une fois qu'on a résolu cette problématique là, on va se poser une seconde question où est ce que résident de l'état est ce que certains composants vont être responsables de leur propre état ou non.
