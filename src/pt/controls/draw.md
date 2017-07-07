# Desenhando features

Novas geometrias podem ser desenhadas utilizando a interação `ol.interaction.Draw`. Esta interação é construída com uma fonte vetorial e um tipo de geometria.

## Criar uma camada vetorial e uma interação `Draw`

### Tarefas

1. Vamos começar com o exemplo abaixo. Abra o arquivo `map.html` em seu editor de texto e deixe-o assim:

  ```html
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/ol.css" type="text/css">
        <style>
        #map {
          height: 256px;
          width: 512px;
        }
        </style>
        <script src="/loader.js" type="text/javascript"></script>
        <title>OpenLayers example</title>
      </head>
      <body>
        <h1>My Map</h1>
        <div id="map"></div>
        <script type="text/javascript">
          var source = new ol.source.Vector({
            url: '/data/layers/7day-M2.5.json',
            format: new ol.format.GeoJSON()
          });
          var draw = new ol.interaction.Draw({
            source: source,
            type: 'Point'
          });
          var map = new ol.Map({
            interactions: ol.interaction.defaults().extend([draw]),
            target: 'map',
            layers: [
              new ol.layer.Tile({
                title: 'Global Imagery',
                source: new ol.source.TileWMS({
                  url: 'https://ahocevar.com/geoserver/wms',
                  params: {LAYERS: 'nasa:bluemarble', TILED: true}
                })
              }),
              new ol.layer.Vector({
                title: 'Earthquakes',
                source: source,
                style: new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                      color: '#0000FF'
                    }),
                    stroke: new ol.style.Stroke({
                      color: '#000000'
                    })
                  })
                })
              })
            ],
            view: new ol.View({
              projection: 'EPSG:4326',
              center: [0, 0],
              zoom: 1
            })
          });
        </script>
      </body>
    </html>
  ```

1. Salve suas alterações no arquivo `map.html` e abra a página em seu navegador: {{ book.workshopUrl }}/map.html. Para desenhar um ponto, clique sobre o mapa e adicione uma nova feature:
  
  ![Usando uma interação para adicionar geometrias para uma fonte vetorial](draw1.png)

### Tarefas de Bônus

1. Crie um listener para obter as coordenadas X e Y após desenhar um ponto.

### Soluções

Aqui está a solução para a primeira atividade de bônus. Nós registramos um observador para o evento `drawed` da classe `ol.interaction.Draw`. Este método loga as coordenadas X e Y no console de desenvolvimento:

```js
draw.on('drawend', function(evt){
  var feature = evt.feature;
  var p = feature.getGeometry();
  console.log(p.getCoordinates());
});
```
