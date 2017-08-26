# Créez une carte

Dans OpenLayers, une carte est une collection de couches qui est rendue dans une page web. Pour créer une carte, vous avez besoin de balises (HTML) qui crée une fenêtre de carte (c'est à dire un élément `<div>`), un peu de style pou donner à la fenêtre de carte les dimensions appropriéesà votre page et le code d'initialisation de la carte.

## Exemple fonctionnel

Assurez-vous d'avoir bien complété les [instructions de configuration](../) pour installer les dépendances et avoir le serveur de debug qui fonctionne.

Maintenant, créons un exemple fonctionnel complet d'une carte OpenLayers. Au minimum, nous avons besoin d'une balise avec un élément "container" pour une carte, et une instance `Map` de OpenLayers que nous configurons avec une couche et une vue.

### Les balises HTML

En premier, nous créons un fichier `index.html` à la racine du répertoire de workshop:

[import](../../../src/en/examples/basics/map.html)

Notez que nous n'avons pas besoin d'inclure la moindre balise `<script>` pour notre application. Notre configuration webpack se charge de cela. Notre `<style>` permet au container de carte de remplir la page complète, et nous utiliserons le container `<div>` avec l'id `map-container` comme cible pour la carte.

### L'application

Pour tavailler avec OpenLayers, nous importons [le package `ol`](https://www.npmjs.com/package/ol) depuis npm. C'est fait avec un `npm install` dans notre terminal:

    npm install --save ol

Ensuite, comme point d'entrée de l'application, nous créons un fichier `main.js`, et le sauvons aussi à la racine du répertoire du workshop:

[import](../../../src/en/examples/basics/map.js)

Tout en haut, nous faison un import des modues requis depuis le package `ol`. Notez l'import `'ol/ol.css'`, qui ajoute les styles dont OpenLayers a besoin pour ces composants graphiques (UI) de base. Avec tout ce que nous avions besoin d'importer, nous avançons et créons une `Map`. La `target` (cible) pointe vers le container `<div>` que nous avons dans notre markup. Nous configurons la carte avec une couche image tuilée (`TileLayer`) et une `XYZSource`. Enfin, la `View` définit le centre (`center`) et le `zoom` initiaux.

### Voir la carte

Maintenant, notre application est prête à être testée. Ouvrons la carte fonctionnelle dans une navigateur web: {{book.workshopUrl}}/. C'est ce à quoi elle devrait ressembler:

![Une carte du monde](map.png)

Dans le chapitre final du workshop, nous apprendrons comment créer un "build" de production d l'application pour le déploiement.
