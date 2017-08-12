# Comprendre les styles

Quand vous stylez des éléments HTML, vous devez utilisez des CSS ressemblant à ci-dessous:

```css
  .someClass {
    background-color: blue;
    border-width: 1px;
    border-color: olive;
  }
```

Le texte `.someClass` est un sélecteur (dans ce cas, il sélectionne tous les éléments qui incluent le nom de la classe `'someClass'`) et le bloc qui suit est un groupe de propriétés nommées avec des valeurs, connues aussi comme déclarations de style.

## Style de couche

Une couche vecteur peut avoir des styles. Plus spécifiquement, une couche vecteur peut être configurée avec un objet `ol.style.Style`, un tableau d'objets `ol.style.Style`, ou une fonction qui prend pour argument une instance `ol.Feature` et une  résolution et qui retourne un tableau d'objets `ol.style.Style`.

Voici un exemple de couche vecteur configurée avec un style statique:

```js
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      // ...
    })
  });
```

Et voici un exemple de couche vecteur configurée avec une fonction de style qui applique un style à tous les objets géographiques qui ont un attribut nommé `class` avec une valeur de `'someClass'`:

```js
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature, resolution) {
      if (feature.get('class') === 'someClass') {
        // create styles...
        return styles;
      }
    },
  });
```

## Les symboliseurs

L'équivalent d'un bloc de déclaration en CSS est un `symboliseur` en OpenLayers (ce sont typiquement des instances de classes `ol.style`). Pour peindre des objets géographiques avec un fond bleu et une ligne de 1 pixel de large de couleur olive, vous devrez utilisez deux symboliseurs comme suivant:

```js
  new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
    stroke: new ol.style.Stroke({
      color: 'olive',
      width: 1
    })
  });
```

En fonction du type de géométrie, différents symboliseurs peuvent être appliqués. Les lignes fonctionnent comme les polygones, mais elles ne peuvent pas avoir un remplissage. Les points peuvent être stylés avec `ol.style.Circle` et `ol.style.Icon`. Le premier est utilisé pour faire le rendu des formes de type cercle, et le dernier utilise les images venant de fichiers (e.g. comme des images png). Voici un exemple pour les styles avec un cercle:

```js
  new ol.style.Circle({
    radius: 20,
    fill: new ol.style.Fill({
      color: '#ff9900',
      opacity: 0.6
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc00',
      opacity: 0.4
    })
  });
```

## `ol.style.Style`

Un objet `ol.style.Style` a 4 clés: `fill`, `image`, `stroke` et `text`. Il a aussi une propriété optionnelle `zIndex`. La fonction de style retournera un tableau d'objets `ol.style.Style`.

Si vous voulez que tous les objets géographiques soit coloriés en rouge à l'exception de ceux qui ont une attribut `class` ayant pour valeur `"someClass"` (et que vous voulez que ces objets géographiques soient coloriés en bleu avec une ligne de 1 pixel de large de couleur olive), vous devrez créer une fonction de style qui resssemble à celle qui suit (par ailleurs, il est important de créer les objets en dehors de la fonction de style afin qu'ils puissent être réutilisés, mais pour des raisons de simplicité les objets sont créés "inline" dans l'exemple ci-dessous):

```js
  var primaryStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
    stroke: new ol.style.Stroke({
      color: 'olive',
      width: 1
    })
  });

  var otherStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'red'
    })
  });

  layer.setStyle(function(feature, resolution) {
    if (feature.get('class') === 'someClass') {
      return primaryStyle;
    } else {
      return otherStyle;
    }
  });
```

*Note* - Il est important de créer les styles en dehors de la fonction de style réelle. La fonction de style est appelée de nombreuses fois pendant les phases de rendu, et vous aurez une animation plus fluide si vos fonctions de style ne créent pas trop d'éléments inutiles en mémoire.

Un objet géographique a aussi un option de configuration de style qui peut prendre une fonction n'ayant que la résolution comme argument. Cela permet de styler les objets géographiques de manière individuelle (basés sur la résolution).

## Pseudo-classes

CSS autorise les pseudo-classes sur les sélecteurs. Basiquement, cela limite l'application de déclarations de style basés sur des contextes qui ne sont pas facilement représenté dans un sélecteur, comme la position de la souris, les éléments voisins, ou l'historique du navigateur. Dans OpenLayers, un concept quelque peu similaire est d'avoir une option de configuration de style sur une `ol.interaction.Select`.

Un exemple est:

```js
  var select = new ol.interaction.Select({
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.5)'
      })
    })
  });
```

Avec les basiques de stylage à votre actif, il est temps de passer aux [stylage des couches vecteur](style.md).
