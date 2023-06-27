## Create React App

Pour travailler avec React ce qu'on a fait jusqu'à maintenant c'est que tout simplement dans notre HTML on a chargé react en mode développement, on a chargé ReactDOM et ensuite on a chargé babel pour pouvoir travailler avec le JSX.

Donc ça c'est très sympa pour pouvoir tester React et expérimenter un petit peu avec mais ce n'est pas du tout ce qu'on utilisera en production.

En production ce que l'on va faire c'est qu'on va utiliser des bundlers qui vont permettrent de morceler notre JavaScript en plusieurs fichiers et qui nous permettront ensuite lorsque l'on passera en production de ne gérer qu'un seul fichier.

Donc le problème c'est que la configuration de ces bundlers peut être un petit peu compliqué, encore plus avec React et Badel, donc pour simplifier les choses facebook propose un template, que l'on va pouvoir utiliser pour commencer rapidement.

Alors ce template pour être utilisée a besoin de **node.js** donc je ne reviendrai pas forcément dessus dans cette formation, mais si vous n'avez jamais utilisé node.js je vous invite à regarder les premiers chapitres de cette formation au moins découvrir ce qu'est nodejs et comment l'installer sur votre système.

Donc moi ici si je tape la commande **node --version** j'ai la version 12.22.9 mais ça fonctionne avec n'importe quelle version qui est plus récente.

Donc pour travailler avec ce template là il suffit de taper la commande **npx create-react-app** suivi du nom de votre application.

Attention le nom de votre application doit être en minuscule séparés par des tirets et pas de majuscules ou de camel case.

Exemple **" npx create-react-app tuto-react "**

Donc on vous dit que globalement vous avez quatre commandes
1. **yarn start** qui permet de démarrer un serveur de développement
2. **yarn build** pour construire vos fichiers que vous allez ensuite pouvoir envoyer en ligne
3. **yarn test** il ya un test pour lancer les tests sont en parlera beaucoup plus tard dans cette formation
4. **yarn eject** qui va retirer create-react-app et vous donner directement la configuration

https://phoenixnap.com/kb/update-node-js-version

```bash
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm --version
nvm ls
nvm ls-remote
# --> v18.16.0
nvm install 18.16.0
```

```bash
.
├── node_modules
├── public
└── src
```
- **/public** qui va contenir les fichiers statiques (non générés par le serveur)
- **/src** Nos sources (on rentre par le fichier 'index.js')
- **package.json** qui contient les différents scripts que l'on a évoqués précédement

```bash
./src
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```
### in : index.js

<React.StrictMode> Composant qui va automatiquement vous afficher des alertes si vous utilisez des fonctions qui sont dépréciées ou si vous avez problèmes avec des effets de bord.  Une sorte de mode debug 

### in : App.js

```bash
sudo npm install -g yarn
```
```bash
cd tuto-react
yarn start
```

--> http://localhost:3000/



