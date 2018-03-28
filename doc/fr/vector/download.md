# Télécharger des objets géographiques

Après avoir téléchargé des données et les avoir éditées, nous voulons laisser nos utilisateurs télécharger le résultat. Pour ce faire, nous allons sérialiser nos données d'objets géographiques comme GeoJSON et créer un élément `<a>` avec un attribut `download` qui déclenche la boîte de dialogue de sauvegarde de fichier du navigateur. Dans le même temps, nous ajouterons un bouton à la carte qui permet aux utilisateurs d'effacer les objets géographiques existants et de recommencer.

Tout d'abord, nous avons besoin d'un peu de markup pour représenter les boutons. Ajoutez les éléments suivants sous `map-container` dans votre `index.html`:

[import:'markup'](../../../src/en/examples/vector/download.html)

Maintenant, nous avons besoin d'un peu de CSS pour que les boutons soient corrects. Ajoutez quelque chose comme ceci à l'élément `<style>` dans `index.html`:

[import:'tools', lang:'css'](../../../src/en/examples/vector/download.html)

L'effacement des objets géographiques est la partie la plus simple, alors nous allons faire cela d'abord. La source de vecteur a une méthode `source.clear()`. Nous voulons que les clics sur le bouton "Clear" appelle cette méthode, alors nous allons ajouter un "listner" pour `click` dans notre `main.js`:

[import:'clear'](../../../src/en/examples/vector/download.js)

Pour sérialiser nos données d'objets géographiques pour télécharger, nous utiliserons un format `GeoJSON`. Comme nous voulons que le bouton "Télécharger" fonctionne à n'importe quel moment lors de l'édition, nous sérialiserons les objets géographiques de chaque événement `change` de la source et construirons une data URI pour l'attribut `href` de l'élément `<a>`:

[import:'download'](../../../src/en/examples/vector/download.js)

![Boutons pour effacer et télécharger la donnée](download.png)
