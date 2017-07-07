# Trabalhando com formatos vetoriais

O construtor base da classe `ol.layer.Vector` fornece um tipo de camada altamente flexível. Por padrão, quando você cria uma camada vetorial, nenhuma suposição é feita sobre a origem dos dados, já que isto é competência da classe `ol.source.Vector`. Antes de falarmos sobre estilos, esta seção introduz o básico sobre formatos vetoriais.

## `ol.format`

A classe `ol.Format` do OpenLayers é responsável por fazer o parser dos dados vindos do servidor representando geometrias vetoriais. Esta classe converte o dado `cru` para um objeto do tipo `ol.Feature`.

Considere os dois blocos de código abaixo. Ambos representam o mesmo objeto `ol.Feature` (um ponto em Barcelona, Espanha). O primeiro é serializado como [GeoJSON](http://geojson.org>) (usando o parser ol.format.GeoJSON`). O segundo é serializado como KML (OGC Keyhole Markup Language) (usando o parser `ol.format.KML`).

### Exemplo GeoJSON

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

### Exemplo KML

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
