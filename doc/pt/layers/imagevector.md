# Fontes de imagens vetoriais

No exemplo anterior usando a classe `ol.layer.Vector`, você pode ver que as features são redesenhadas continuamente durante o zoom (o tamanho dos símbolos que representam o ponto continua fixo). Com uma camada vetorial, o OpenLayers irá redesenhar a fonte de dados cada vez que o mapa sofrer algum deslocamento. Isto fornece uma renderização consistente das linhas, pontos, símbolos e rótulos de acordo com a resolução atual do mapa.

Uma estratégia alternativa é evitar essa re-renderização durante as transições, reposicionando e escalando a geometria em função do seu estado anterior. Isto é possível com o uso conjunto das classes `ol.layer.Image` e `ol.source.ImageVector`. Com esta combinação, "snapshots" dos seus dados são renderizados quando a visualização não está sendo alterada e estes snapshots são reusados durante as transições de visualização.

O examplo abaixo usa as duas classes citadas acima. Emborar este exemplo renderize somente uma pequena quantidade de dados, esta combinação seria apropriada para aplicações que renderizam uma grande quantidade de dados estáticos.

## `ol.source.ImageVector`

Vamos agora voltar ao exemplo dos dados sobre terremotos:

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
    <title>OpenLayers example</title>
    <script src="/loader.js" type="text/javascript"></script>
  </head>
  <body>
    <h1>My Map</h1>
    <div id="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
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
                radius: 3,
                fill: new ol.style.Fill({color: 'white'})
              })
            })
          })
        ],
        view: new ol.View({
          projection: 'EPSG:4326',
          center: [0, 0],
          zoom: 0,
          maxResolution: 0.703125
        })
      });
    </script>
  </body>
</html>
```

### Tarefas

1. Abra o arquivo `map.html` no seu editor de texto e copie o conteúdo do exemplo acima. Salve as alterações e confirme o funcionamento no navegador: {{ book.workshopUrl }}/map.html

1. Altere a camada vetorial para:

  ```js
    new ol.layer.Image({
      title: 'Earthquakes',
      source: new ol.source.ImageVector({
        source: new ol.source.Vector({
          url: '/data/layers/7day-M2.5.json',
          format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
          image: new ol.style.Circle({
          radius: 3,
            fill: new ol.style.Fill({color: 'white'})
          })
        })
      })
    })
  ```

1. Recarregue a página {{ book.workshopUrl }}/map.html no navegador

  *Nota* - Você verá os mesmos dados vetoriais, mas representados como uma imagem. Ainda será possível fazer a detecção das geometrias, mas os dados vetoriais terão uma qualidade menor. Assim, é essencialmente um trade-off entre desempenho e qualidade. 
  
### Olhando mais de perto

Vamos examinar a criação da camada para entender o que está acontecendo.

```js
  new ol.layer.Image({
    title: 'Earthquakes',
    source: new ol.source.ImageVector({
      source: new ol.source.Vector({
        url: '/data/layers/7day-M2.5.json',
        format: new ol.format.GeoJSON()
      }),
      style: new ol.style.Style({
        image: new ol.style.Circle({
        radius: 3,
          fill: new ol.style.Fill({color: 'white'})
        })
      })
    })
  })
```

Nós estamos usando a classe `ol.layer.Image` ao invés da `ol.layer.Vector`. Entretanto, nós podemos ainda usar os dados vetoriais a partir da classe `ol.source.ImageVector`, fazendo uso da fonte original da classe `ol.source.Vector`. Observe que o estilo é fornecido para a configuração da classe `ol.source.ImageVector` e não para a camada.

### Tarefas de bônus

1. Verifique se a detecção da feature continua funcionando registrando um listener `'singleclick'` ao mapa e chamando o método `forEachFeatureAtPixel` sobre ele. Exiba as informações retornadas abaixo da área do mapa.
