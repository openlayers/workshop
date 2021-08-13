# Styler une couche VectorTile

Styler une couche de tuiles vecteur fonctionne exactement de la même manière que le style d'une couche vecteur. Nous allons maintenant essayer de styler notre carte du monde afin qu'elle ressemble réellement à ce qu'une carte du monde est supposée ressembler.

## Charger les polices de caractères

Disons que nous voulons utiliser une police plus agréable pour les étiquettes dans notre carte. J'ai décidé d'utiliser la famille de polices Open Sans, qui peut facilement être chargée avec une feuille de style supplémentaire dans le `<head>` de notre index.html:

[import:'font'](../../../src/en/examples/vectortile/ugly.html)

## Définir un couleur d'arrière-plan à la carte

Un élément de style commun dans les cartes de tuiles vecteur est une couleur d'arrière-plan, que l'utilisateur voit dans des endroits qui ne sont pas couverts par des géométries. Comme nous l'avons déjà vu dans l'exercice [vecteur](../vector/download.md), cela peut se faire simplement en définissant une couleur d'arrière-plan dans un `<style>` pour le `# map-container`:

[import:'background'](../../../src/en/examples/vectortile/ugly.html)

## Styler une couche avec une fonction de style

Maintenant, nous allons ajouter un peu de code d'application à `main.js`.

Tout d'abord, nous aurons besoin de faire des imports pour les styles que nous allons utiliser:

[import:'style-import'](../../../src/en/examples/vectortile/ugly.js)

La fonction de style est un peu longue:

[import:'style'](../../../src/en/examples/vectortile/ugly.js)

Je pense que vous conviendrez que nous n'avons pas atteint notre objectif de créer une belle carte du monde:

![Une carte du monde "moche"](ugly.png)

Il y a beaucoup plus d'efforts impliqué dans le stylage approprié d'une carte du monde, et l'écriture d'une fonction de style dans JavaScript n'est probablement pas le bon outil. Dans l'exercice [suivant](bright.md), nous allons apprendre une manière différente de charger et de styler les couches de tuiles vecteur.
