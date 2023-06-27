## Parcel

Parcel est un Bundler qui de gérer différents types de fichiers et de les compresser en un seul fichier en sortie...
Cet outil ne demande aucune configuration !

```bash
cd ParcelReact
yarn init -y
yarn add react react-dom
```

```javascript
import {render} from 'react-dom'

render(
  <div>Hello World !</div>
);
```

**index.jsx**
```html
	<script src="src/index.jsx" defer></script>
```

**Installer Parcel** au niveau de notre projet
```bash
yarn add -D parcel-bundler
```

```bash
npx parcel index.html
```
ça va démarrezr un serveur de développement --> localhost:1234


"React is not defined" dans console...

Résolution dans **index.jsx**
```javascript
import React from 'react'
```

Maintenant s'affiche "Hello World !"

Change le CSS sans réactualiser...

Comment publier son projet ?
- Couper npx parcel
- supprimer le dossier "dist"

```bash
npx parcel build index.html
```
Ne lance pas un serveur de dev' mais construire les fichiers dans "dist" ceux ci minifiés avec réfèrences convenables (fichiers renomés avec un hash afin de rafraichier le cache)

**Fast Refresh** dans version 2.0 de **Parcel**

**Installer Parcel** au niveau de notre projet

Encore un peu buggée, mais supporte le fast refresh

```bash
yarn remove parcel-bundler
yarn add -D parcel@next
```

Les composants seront rafreaichi sans que les états soient changés !!
Ne fonctionne qu'avec l'API des Hooks qui seront vu dans les chapitres suivants...
