# Afficher une barre d'échelle

Un autre widget typique à afficher sur une carte est la barre d'échelle.  OpenLayers fournit un `ol.control.ScaleLine` juste pour cela.

## Créer un `control` de barre d'échelle (`ScaleLine`)

### Tâches

1.  Ouvrez `map.html` dans votre éditeur de texte.

2.  Quelque part dans la configuration de la carte, ajoutez le code suivant pour créer un nouveau `control` de barre d'échelle pour votre carte:

  ```js
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine()
    ]),
  ```

3.  Sauvez vos changements et ouvrez `map.html` dans votre navigateur: {{ book.workshopUrl }}/map.html

  ![Une barre d'échelle par défaut dans le coin en bas à gauche](./scaleline1.png)

## Déplacer le `control` de type `ScaleLine`

Vous pouvez trouver la barre d'échelle difficile à lire par dessus le fond image. Il y a quelques approches à prendre en compte pour améliorer la visibilité de l'échelle.  Si vous voulez gardez le `control` dans la fenêtre d'affichage de carte, vous pouvez ajouter quelques déclarations de style dans le CSS de votre document. Pour tester cela, vous pouvez inclure une couleur de fond et une marge à la barre d'échelle avec quelque chose comme ce qui suit:

```css
  .ol-scale-line {
    background: black;
    padding: 5px;
  }
```

Cependant, pour l'intérêt de l'exercice, admettons que vous pensez que l'affichage de la fenêtre de carte est vraiment absolument trop chargée. Pour éviter cet encombrement, vous pouvez afficher votre échelle dans un lieu différent. Pour accomplir ceci, nous avons besoin en premier de créer un élément additionnel dans notre balisage et ensuite, de dire au `control` d'échelle de faire son rendu à l'intérieur de ce nouvel élément.

### Tâches

1.  Créez un nouvel élément de type block dans la partie `<body>` de votre page. Pour rendre cet élément facile à être référé, nous lui donnons un attribut `id`. Insérez le balisage suivant quelque part dans le `<body>` de votre page `map.html`. (en plaçant l'élément d'échelle juste après l'élement de la fenêtre d'affichage de carte `<div id="map"></div>` est ce qui parait le plus logique.):

  ```html
    <div id="scale-line" class="scale-line"></div>
  ```

2.  Maintenant, modifiez le code créant le `control` d'échelle afin qu'il se réfère à l'élément `scale-line`:

  ```js
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
    ]),
  ```

3.  Sauvez vos changements et ouvrez `map.html` dans votre navigateur: {{ book.workshopUrl }}/map.html

4.  "Corrigez" la position du `control` avec, par exemple, les règles CSS suivantes:

  ```css
    .scale-line {
      position: absolute;
      top: 350px;
    }
    .ol-scale-line {
      position: relative;
      bottom: 0px;
      left: 0px;
    }
  ```

5.  Maintenant, sauvegardez vos changements et regardez `map.html` à nouveau dans votre navigateur: {{ book.workshopUrl }}/map.html

  ![Un `control` de barre d'échelle à l'extérieur de la fenêtre d'affichage de la carte](scaleline2.png)


*Note* - Pour créer un `control` personnalisé, vous pouvez le faire hériter (en utilisant `ol.inherits`) de `ol.control.Control`. Pour voir, un exemple de cela, allez-voir: http://openlayers.org/en/master/examples/custom-controls.html.
