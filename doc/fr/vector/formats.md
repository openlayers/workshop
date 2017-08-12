# Travailler avec les formats vecteur

Le constructeur "de base" `ol.layer.Vector` fournit un type de couche plutôt flexible. Par défaut, quand vous créez une nouvelle couche vecteur, aucune présupposition n'est faite concernant d'où les objets géographiques pour la couche seront fournis, comme c'est du domaine de `ol.source.Vector`.  Avant de nous engager dans le stylage des objets géographiques vecteur, cette section introduit les basiques des formats vecteur.

## `ol.format`

Les classes `ol.format` dans OpenLayers sont responsables du "parsing" des données venant du serveur et représentant les objets géographiques vecteur. Le format transforme un objet géographique brut en objet `ol.Feature`.

Considérons les deux blocs de données ci-dessous. Les deux représentent le même objet `ol.Feature` (un point à Barcelone, Espagne). Le premier est sérialisé comme [GeoJSON](http://geojson.org>) (en utilisant le "parser" `ol.format.GeoJSON`). Le second est sérialisé comme KML (OGC Keyhole Markup Language) (en utilisant le "parser" `ol.format.KML`).

### Exemple GeoJSON

```json
{
  "type": "Feature",
  "id": "OpenLayers.Feature.Vector_107",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [-104.98, 39.76]
  }
}
```

### Exemple KML

```xml
<?xml version="1.0" encoding="utf-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
  <Placemark>
    <Point>
      <coordinates>-104.98,39.76</coordinates>
    </Point>
  </Placemark>
</kml>
```
