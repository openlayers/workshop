# Modificando features

A alteração de features funciona a partir da combinação da classe `ol.interaction.Select` com a classe `ol.interaction.Modify`. Elas compartilham uma coleção (`ol.Collection`) de features. Features selecionadas pela `ol.interaction.Select` tornam-se candidatas para modificação com a `ol.interaction.Modify`.

## Criar uma camada vetorial e uma interação do tipo `Modify`

### Tarefas

1. Vamos iniciar com o exemplo completo. Abra o arquivo `map.html` em seu editor de texto e deixe-o assim:

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
        var style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 7,
              fill: new ol.style.Fill({
              color: [0, 153, 255, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 255, 255, 0.75],
              width: 1.5
            })
          }),
          zIndex: 100000
        });
        var select = new ol.interaction.Select({style: style});
        var modify = new ol.interaction.Modify({
          features: select.getFeatures()
        });
        var map = new ol.Map({
          interactions: ol.interaction.defaults().extend([select, modify]),
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

1. Salve suas alterações no arquivo `map.html` e abra a página em seu navegador: {{ book.workshopUrl }}/map.html. Para ver o componente em ação, clique para selecionar um terremoto e arraste para mover o ponto.

## Olhando mais de perto

Vamos entender agora como a alteração de features funciona.

```js
  var style = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
        fill: new ol.style.Fill({
        color: [0, 153, 255, 1]
      }),
      stroke: new ol.style.Stroke({
        color: [255, 255, 255, 0.75],
        width: 1.5
      })
    }),
    zIndex: 100000
  });
  var select = new ol.interaction.Select({style: style});
  var modify = new ol.interaction.Modify({
    features: select.getFeatures()
  });
```

Nós criamos duas interações, uma `ol.interaction.Select` para selecionar a feature antes de modificá-la e uma `ol.interaction.Modify` para modificar as geometrias. Elas compartilham a mesma coleção de features. Features selecionadas usando a `ol.interaction.Modify` tornam-se candidatas para modificação com a `ol.interaction.Modify`. Do mesmo modo de antes, a `ol.interaction.Select` é configurada com um objeto `style`, que efetivamente define o estilo para desenhar a geometria. Quando o usuário clica sobre o mapa novamente, a feature será desenhada com o estilo da camada.
