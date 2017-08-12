## Selecionando features

Como vimos no módulo sobre camadas, nós podemos colocar features vetoriais sobre o mapa. Uma das vantagens dos dados vetoriais é que usuários podem interagir com eles. Neste exemplo, criaremos uma camada vetorial na qual os usuários podem selecionar e visualizar informações sobre a feature.

No exemplo anterior, utilizamos a classe `ol.control.Control`. Controles possuem uma representação visual sobre o mapa ou adicionam elementos DOM ao documento. Um objeto do tipo `ol.interaction.Interaction` é responsável por tratar a interação do usuário, mas geralmente não possui representação visual. Este exemplo demonstra o uso da classe `ol.interaction.Select` para interagir com as features de uma camada vetorial.

## Criar uma camada vetorial e adicionar uma interação do tipo Select

### Tarefas

1. Iniciaremos com o exemplo de camada vetorial da [seção anterior](../layers/vector.md). Abra o arquivo `map.html` no seu editor de texto e altere-o para que fique assim:

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
        var map = new ol.Map({
          interactions: ol.interaction.defaults().extend([
            new ol.interaction.Select({
              style: new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 5,
                  fill: new ol.style.Fill({
                    color: '#FF0000'
                  }),
                  stroke: new ol.style.Stroke({
                    color: '#000000'
                  })
                })
              })
            })
          ]),
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
              source: new ol.source.Vector({
                url: '/data/layers/7day-M2.5.json',
                format: new ol.format.GeoJSON()
              }),
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

1. Salve suas alterações no arquivo `map.html` e abra a página no navegador: {{ book.workshopUrl }}/map.html. Para ver a seleção da feature em ação, dê um clique para selecionar um terremoto:

  ![Usando uma interação para selecionar features de uma camada vetorial](select1.png)
