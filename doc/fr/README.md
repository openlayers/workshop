# Workshop OpenLayers

Bienvenue au **Workshop OpenLayers**. Ce workshop est conçu pour vous donner une vue d'ensemble d'OpenLayers en tant que solution de cartographie en ligne.

## Configuration

Ces instructions assument que vous avez récupéré l'archive `openlayers-workshop-fr.zip` depuis la [dernière version du workshop](https://github.com/openlayers/workshop/releases).  En plus, vous devrez avoir [Node](https://nodejs.org/) v6 ou supérieur installé pour lancer une serveur de développement pour la bibliothèque OpenLayers.

Après extraction du fichier zip, allez dans le répertoire `openlayers-workshop-fr` et installez quelques dépendances additionnelles:

    npm install

Maintenant, vous êtes prêts à démarrer le serveur pour le workshop.  Il sert la documentation du workshop en plus de fournir un "bundler" de modules pour la bibliothèque OpenLayers.

    npm start

Cela va démarrer un serveur de développement où vous pourrez lire la documentation du workshop et avancez sur les exercices.  Vous devriez être capable de confirmer que les choses marchent en voyant une popup d'alerte sur {{book.workshopUrl}}/.  Vous pouvez lire la documentation du workshop sur {{book.workshopUrl}}/doc/.

## Vue d'ensemble

Ce workshop est présenté comme un jeu de modules.  Dans chacun de ces modules, vous devrez effectuer un ensemble de tâche conçues pour assimiler un but spécifique à ce module.  Chaque module enchaîne les leçons vues dans les modules précédents et est conçu pour vous faire monter en compétence par étapes.

Les modules suivants seront couverts par ce workshop:

* [Bases](basics/README.md) - Apprendre comment ajouter une carte dans une page web avec OpenLayers.
* [Données vecteur](vector/README.md) - Travailler avec des données vecteur.
* [Tuiles vecteur](vectortile/README.md) - Créer des belles cartes avec des tuiles vecteur.
* [Opérations Raster](raster/README.md) - Manipuler des pixels avec une source raster.
* [Déployer](deploying/README.md) - Créer des applications pour la production.