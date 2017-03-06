# Ressources OpenLayers utiles

La bibliothèque OpenLayers contient de riches fonctionnalités. Bien que les développeurs aient travaillés durs pour fournir des exemples des fonctionnalités et aient organisés le code d'une manière qui permette à d'autres développeurs expérimentés de trouver leur chemin, de nombreux utilisateurs trouvent que c'est un challenge de partir de rien.

## Apprendre par l'exemple

Les nouveaux utilisateurs trouveront probablement que plonger dans les exemples de code OpenLayers et expérimenter avec les possibilités de fonctionnalités de la bibliothèque est la voie la plus facile pour débuter.

* http://openlayers.org/en/master/examples/

## Explorer la documentation

Pour plus d'informations sur des sujets spécifiques, naviguer la collection grandissante de documentation pour OpenLayers.

* http://openlayers.org/en/master/doc/quickstart.html
* http://openlayers.org/en/master/doc/tutorials

## Trouver la référence de l'API

Après avoir compris les composants de base qui constituent et contrôlent une carte, cherchez la documentation de référence de l'API pour les détails sur les signatures des méthodes et les propriétés des objets. Si vous voulez voir seulement la partie stable de l'API, assurez-vous de vérifier que vous avez coché la case à cocher `Stable Only`.

* http://openlayers.org/en/master/apidoc/

## Rejoigner la communauté

OpenLayers est supportée et maintenue par une communauté de développeurs et d'utilisateurs comme vous. Que vous ayez des questions à demander ou du code pour contribuer, vous pouvez vous impliquer en utilisant le tag `openlayers` sur Stack Overflow pour les questions relatives aux usages ou vous inscrire à la liste de développement du projet.

* http://stackoverflow.com/questions/tagged/openlayers
* https://groups.google.com/forum/#!forum/openlayers-dev

## Remonter des dysfonctionnements/problèmes

Pour remonter des problèmes, il est important de comprendre les différentes versions de la bibliothèque 'OpenLayers qui sont distribuées:

* `ol.js` - le script qui est créé avec Closure Compiler en mode avancé (non lisible par un humain)
* `ol-debug.js` - version lisible par un humain pouvant être utilisée lors du développement

Quand vous rencontrez une erreur/un problème, il est important de la reporter en utilisant `ol-debug.js`. Incluez aussi la trace complète que vous pouvez trouver en utilisant les outils de développement Web comme les `Developer Tools` de Chrome. Pour tester cela, nous allons commettre une erreur dans map.html en changeant `ol.layer.Tile` par `ol.layer.Image`. L'erreur que vous allez voir sera: `Uncaught TypeError: undefined is not a function`. Si vous remontez cette erreur sur la liste de discussion, personne ne saura ce que cela signifie. En premier, nous allons changer la balise `script` qui pointe vers `ol.js` pour qu'elle pointe vers `ol-debug.js` à la place. Rechargez la page. Le debugger doit maintenant s'arrêter sur l'erreur et nous pouvons voir la trace complète.

![A un point d'arrêt dans le debugger](debugger.png)
