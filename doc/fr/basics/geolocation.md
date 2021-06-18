# Zoomer sur votre position

Les navigateurs fournissent une API pour avoir l'emplacement actuel de l'utilisateur. Nous voulons utiliser cette fonctionnalité pour zoomer sur la carte à l'endroit où l'utilisateur est actuellement. Pour rendre plus facile à l'utilisateur de voir ce qui se passe sur la carte, nous voulons animer le zoom.

## Changements de l'application

Tout d'abord, nous devons assigner la carte à une constante, afin que nous puissions y accéder depuis d'autres composants que nous allons ajouter dans cet exercice:

[import:'map-const'](../../../src/en/examples/basics/geolocation.js)

Pour ajouter la fonctionnalité de géolocalisation, nous ajoutons un petit bloc de code à notre fichier `main.js`:

[import:'geolocation'](../../../src/en/examples/basics/geolocation.js)

Cela nécessite un nouvel import pour la fonction `proj.fromLonLat()`, qui convertit les coordonnées longitude/latitude dans le système de coordonnées qu'OpenLayers utilise par défaut pour la vue de la carte (Web Mercator, EPSG: 3857).

[import:'import-proj'](../../../src/en/examples/basics/geolocation.js)

### Voir le résultat

Quand nous regardons la carte dans le navigateur web ({{book.workshopUrl}}/), nous aurons surement une demande qui va demander si nous voulons donner accès à la page à notre emplacement. Après avoir répondu 'Oui', un zoom animé devrait nous conduire sur notre position actuelle.