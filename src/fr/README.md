# Workshop OpenLayers

Bienvenue au **Workshop OpenLayers**. Ce workshop est conçu pour vous donner une vue d'ensemble d'OpenLayers en tant que solution de cartographie en ligne.

## Configuration

Ces instructions assument que vous avez récupéré l'archive `openlayers-workshop-fr.zip` depuis la [dernière version du workshop](https://github.com/openlayers/workshop/releases).  En plus, vous devez avoir [Node](https://nodejs.org/) installé pour lancer une serveur de développement pour la bibliothèque OpenLayers.

Après extraction du fichier zip, allez dans le répertoire `openlayers-workshop-fr` et installez quelques dépendances additionnelles:

    npm install

Maintenant, vous êtes prêts à démarrer le serveur pour le workshop.  Il sert la documentation du workshop en plus de fournir un chargeur pour le debug pour la bibliothèque OpenLayers.

    npm start

Cela va démarrer un serveur de développement où vous pourrez lire la documentation du workshop et avancez sur les exercices: {{ book.workshopUrl }}.

## Vue d'ensemble

Ce workshop est présenté comme un jeu de modules.  Dans chacun de ces modules, vous devrez effectuer un ensemble de tâche conçues pour assimiler un but spécifique à ce module.  Chaque module enchaîne les leçons vues dans les modules précédents et est conçu pour vous faire monter en compétence par étapes.

Les modules suivants seront couverts par ce workshop:

* [Les basiques](basics/README.md) - Apprendre comment ajouter une carte dans une page web avec OpenLayers.
* [Les couches et les sources](layers/README.md) - Apprendre à propos des couches et sources.
* [Les `Controls` et les `Interactions`](controls/README.md) - Apprendre comment utiliser les `controls` et les `interactions` au sens Openlayers.
* [Les sujets liés aux vecteurs](vector/README.md) - Explorer les couches vecteur en profondeur.
* [Les `build` personnalisés](custom-builds/README.md) - Créer des `build` personnalisés d'OpenLayers.
