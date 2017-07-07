# Camadas raster proprietárias

Nas seções anteriores, nós exibimos camadas que estão em conformidade com o padrão WMS (OGC Web Map Service) e um cache personalizado de `tiles`. Os mapas online (ou pelo menos os clientes de mapa em blocos) foram largamente popularizados pela disponibilização de serviços de `tiles` proprietários. O OpenLayers fornece tipos de camadas que trabalham com esses serviços proprietários por meio de suas APIs.

Nesta seção, continuaremos trabalhando sobre o exemplo da [seção anterior](cached.md), adicionando uma camada `tiles` do Bing.

## Bing!

Vamos adicionar uma camada Bing!

### Tarefas

1. No seu arquivo `map.html`, encontre o local onde foi configurada a fonte OSM (OpenStreetMap) e mude para `ol.source.BingMaps`

  ```js
    source: new ol.source.BingMaps({
      imagerySet: 'Road',
      key: '<Your Bing Maps Key Here>'
    })
  ```
  *Nota* - A API do Bing requer que você registre uma chave para usá-lo dentro de sua aplicação. Este exemplo usa uma chave que você não deve utilizar em produção. Para usar em produção, registre uma chave em: https://www.bingmapsportal.com/.
  
1. Salve as alterações e recarregue o arquivo `map.html`em seu navegador: {{ book.workshopUrl }}/map.html

  ![Um mapa com uma camada Bing](proprietary1.png)

## Exemplo completo

Seu arquivo `map.html` deveria estar assim:

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
      .ol-attribution a {
        color: black;
      }
    </style>
    <script src="/loader.js" type="text/javascript"></script>
    <title>OpenLayers example</title>
  </head>
  <body>
    <h1>My Map</h1>
    <div id="map" class="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.BingMaps({
              imagerySet: 'Road',
              key: '<Your Bing Maps Key Here>'
            })
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([126.97, 37.56]),
          zoom: 9
        })
      });
    </script>
  </body>
</html>
```
