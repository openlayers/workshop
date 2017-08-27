# Opérations raster

Jusqu'à présent, lorsque nous avons utilisé des données raster (avec une source de tuiles XYZ par exemple), nous l'avons utilisé à des fins de présentation uniquement — en rendant les données directement sur la carte. Il est aussi possible de travailler avec les valeurs des pixels dans les données que nous récupérons, d'exécuter des opérations sur ces valeurs et de manipuler les choses avant le rendu. La source `Raster` fournit un moyen d'exécuter des opérations par pixel sur des données provenant de n'importe quel nombre de sources en entrée. Lorsque la source est utilisée dans une couche `Image`, le résultat de l'opération raster peut être rendu sur la carte.

Dans ces exercices, nous travaillerons avec des données d'altitude servies comme tuiles XYZ. Au lieu de rendre directement les données d'élévation encodées, nous effectuerons une opération par pixel sur les données avant de faire le rendu.

* [Configuration de la carte](map.md)
* [Faire le rendu des données élévation](elevation.md)
* [Faire le rendu du niveau de la mer](raster.md)
