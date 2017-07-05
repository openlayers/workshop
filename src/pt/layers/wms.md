# Camadas WMS (Web Map Service)

Quando você adiciona uma camada ao seu mapa, a fonte de dados da camada é, geralmente, responsável por obter os dados a serem exibidos. O dado requisitado pode ser do tipo raster ou vetorial. Você pode pensar no raster como uma informação renderizada pelo servidor em formato de imagem. Por outro lado, um dado vetorial é entregue pelo servidor como uma informação estruturada e pode ser renderizada pelo cliente (seu navegador).

Existem diferentes serviços que fornecem dados do tipo raster. Esta seção apresenta os provedores que estão em conformidade com a especificação OGC (Open Geospatial Consortium, Inc.) [Web Map Service (WMS)](http://www.opengeospatial.org/standards/wms).

## Criando uma camada

Iniciaremos com um exemplo completo e modificaremos as camadas para uma melhor compreensão de como elas funcionam.

Vamos examinar o seguinte código:

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
        target: 'map',
        layers: [
          new ol.layer.Tile({
            title: 'Global Imagery',
            source: new ol.source.TileWMS({
              url: 'https://ahocevar.com/geoserver/wms',
              params: {LAYERS: 'nasa:bluemarble', TILED: true}
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

1. Se você ainda não tiver feito, salve o texto acima como `map.html` no diretório raiz do workshop.

1. Abra a página no seu navegador para confirmar que está funcionando: {{ book.workshopUrl }}/map.html

## O construtor da classe `ol.layer.Tile`

O construtor da classe `ol.layer.Tile` aceita como parâmetro um objeto literal do tipo `ol.layer.TileOptions` veja: http://openlayers.org/en/master/apidoc/ol.layer.Tile.html.
Neste caso, nós estamos passando a chave `source` por meio do objeto `ol.source.TileWMS`.
A camada pode receber um título humanamente legível por meio da chave `title`, mas qualquer nome arbitrário para a chave pode ser fornecido aqui.
No OpenLayers existe uma separação entre as camadas (`layers`) e as fontes de dados (`sources`), apesar de no OpenLayers 2 tudo fazer parte da camada.

`ol.layer.Tile` representa uma grade regular de imagens, `ol.layer.Image` representa uma única imagem. Dependendo do tipo de camada, você pode usar uma fonte de dados diferente (`ol.source.TileWMS` versus `ol.source.ImageWMS`).

## O construtor da classe ol.source.TileWMS

O construtor da classe `ol.source.TileWMS` tem um único argumento (ver: http://openlayers.org/en/master/apidoc/ol.source.TileWMS.html).
`url` é o endereço do provedor WMS e `params` é um objeto literal com os nomes dos parâmetros e seus respectivos valores. Somente o parâmetro `LAYERS` é requerido. Neste exemplo, adicionamos `TILED: true`, uma extensão específica do Geoserver para melhorar o cache dos blocos (`tiles`) gerados pelas camadas WMS.

```js
  layers: [
    new ol.layer.Tile({
      title: 'Global Imagery',
      source: new ol.source.TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {LAYERS: 'nasa:bluemarble', TILED: true}
      })
    })
  ]
```

### Tarefas

1. Este mesmo servidor WMS fornece uma camada [Natural Earth](http://www.naturalearthdata.com/) chamada `'ne:NE1_HR_LC_SR_W_DR'`. Mude o valor do parâmetro `LAYERS` de `'nasa:bluemarble'` para `'ne:NE1_HR_LC_SR_W_DR'`.

  Seu construtor da classe ol.layer.Tile deve ficar assim: 

  ```js
    new ol.layer.Tile({
      title: 'Global Imagery',
      source: new ol.source.TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {LAYERS: 'ne:NE1_HR_LC_SR_W_DR', TILED: true}
      })
    })
  ```

1. Mude sua camada e fonte de dados para ter uma imagem única ao ínves dos `tiles`. Olhe a documentação da API para algumas dicas: http://openlayers.org/en/master/apidoc/ol.layer.Image.html e http://openlayers.org/en/master/apidoc/ol.source.ImageWMS.html. Use a aba `Network` da ferramenta para desenvolvedores do seu navegador para checar se somente uma única imagem está sendo retornada ao invés de blocos de 256x256 pixels.

  ![Uma camada WMS como uma fonte de dados de imagem](wms1.png)

Parabéns! Você acabou de renderizar dados dinâmicos obtidos por meio de um serviço WMS, vamos aprender mais sobre [serviços de `tiles` cacheados](cache.md).
