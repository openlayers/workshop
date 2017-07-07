# `Tiles` cacheados

Por padrão, a camada `Tile` faz requisições para obter imagens de 256 x 256 pixels de modo a preencher a área de visualização do mapa. Conforme você move ou faz zoom no mapa, mais requisições são disparadas para preencher áreas que você ainda não visualizou. Enquanto seu navegador faz o cache de algumas imagens, muito processamento é normalmente exigido do servidor para renderizar imagens dinamicamente.

Como esse tipo de camada faz requisições de imagens numa grade regular, é possível para o servidor fazer cache dessas requisições e retornar o resultado cacheado na próxima vez que você (ou outra pessoa) visitar a mesma área - ocasionando uma melhora no desempenho.

## `ol.source.XYZ`

A especificação WMS é muito flexível em termos do que um cliente pode requisitar. Sem restrições, isto faz com que seja muito difícil, ou até mesmo impossível, fazer cache.

No extremo oposto, um serviço pode oferecer `tiles` somente para níveis de zoom pré-determinados e somente para uma determinada grade. Isto pode ser generalizado como uma camada `tiled` com uma fonte de dados XYZ - você pode considerar X e Y para indicar a coluna e a linha da grade e Z para representar o nível de zoom.

## `ol.source.OSM`

O projeto [OpenStreetMap (OSM)](http://www.openstreetmap.org/) é um esforço para coletar e disponibilizar gratuitamente dados geoespaciais para o mundo. O projeto fornece diferentes renderizações de seus dados como conjuntos de `tiles` cacheados. Estas renderizações estão em conformidade com o arranjo básico da grid XYZ e podem ser usadas num mapa OpenLayers. A fonte de dados `ol.source.OSM` acessa os `tiles` fornecidos pelo OpenStreetMap.

### Tarefas

1. Abra o arquivo `map.html` da [seção anterior](wms.md) num editor de texto e mude o código de inicialização do mapa conforme abaixo:

  ```html
    <script>
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([126.97, 37.56]),
          zoom: 9
        }),
        controls: ol.control.defaults({
          attributionOptions: {
            collapsible: false
          }
        })
      });
    </script>
  ```

1. No `<head>` do mesmo documento, adicione algumas declarações de estilo para a camada:  

  ```html
    <style>
        #map {
            width: 512px;
            height: 256px;
        }
        .ol-attribution a {
            color: black;
        }
    </style>
  ```

1. Salve suas alterações e atualize a página no seu navegador: {{ book.workshopUrl }}/map.html  

  ![Uma camada `tiled` com uma fonte OSM](cached1.png)

## Olhando mais de perto

### Projeções

Revise a definição de visualização do mapa:

```js
  view: new ol.View({
    center: ol.proj.fromLonLat([126.97, 37.56]),
    zoom: 9
  })
```
Dados geoespaciais podem vir em qualquer sistema de coordenadas. Um conjunto de dados pode usar coordenadas geográficas (longitude e latitude) em graus e outro pode usar coordenadas numa projeção local com unidades em metros. Uma discussão completa sobre sistemas de coordenadas referenciais está fora do escopo deste módulo, mas é importante entender o conceito básico.

O OpenLayers precisa saber o sistema de coordenadas de seus dados. Internamente, isto é representado pelo objeto `ol.proj.Projection` mas também pode ser fornecida uma string.

Os `tiles` do OpenStreetMap que você utilizará está na projeção de Mercator. Por causa disso, nós precisamos atribuir o centro do mapa utilizando coordenadas desta projeção. Considerando que é relativamente fácil encontrar coordenadas de um lugar de interesse em coordenadas geográficas, nós usamos o método `ol.proj.fromLonLat` para converter coordenadas geográficas (`'EPSG:4326'`) para coordenadas Mercator (`'EPSG:3857'`).

### Projeções alternativas

O OpenLayers inclui transformações entre sistemas de coordenadas geográficas (`'EPSG:4326'`) e Web Mercator (`'EPSG:3857'`). Por isso, conseguimos utilizar a função `ol.proj.fromLonLat` sem qualquer esforço extra. Se você quiser trabalhar com dados em outras projeções, você precisará de algumas informações adicionais antes de usar as funções `ol.proj.*`.

Por exemplo, se quiser trabalhar com dados no sistema de coordenadas `'EPSG:21781'`, você precisa incluir duas tags de script em sua página:

```html
  <script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js" type="text/javascript"></script>
  <script src="http://epsg.io/21781-1753.js" type="text/javascript"></script>
```

Em seguida, no código de sua aplicação, você pode registrar esta projeção e atribuir sua extensão (`extent`):

```js
  // This creates a projection object for the EPSG:21781 projection
  // and sets a "validity extent" in that projection object.
  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);
```

O `extent` pode ser obtido no site http://epsg.io/ usando o código EPSG.

### Criação da camada

```js
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
```

Como antes, nós criamos uma camada e a adicionamos ao array `layers` do objeto de configuração do mapa. Desta vez, nós aceitamos todas as opções default para a fonte de dados.

### Style

```css
  .ol-attribution a {
    color: black;
  }
```

Um aprofundamento sobre os controles do mapa também está fora do escopo deste módulo, mas estas declarações fornecem uma prévia. Por padrão, um controle `ol.control.Attribution` é adicionado a todos os mapas. Isto permite que as fontes de dados possam fornecer informações de atribuição sobre a área de visualização do mapa. As declarações acima, alteram o estilo desta atribuição para o nosso mapa (note a linha de Copyright sobre a parte inferior direita do mapa).

### Configuração do controle `Attribution`

Por padrão, o controle `ol.control.Attribution` adiciona um botão `i` (informação) que pode ser pressionado para mostrar a informação de atribuição. Para ficar em conformidade com os [Termos de Uso do OpenStreetMap](http://wiki.openstreetmap.org/wiki/Legal_FAQ) e sempre mostrar a informação de atribuição, a seguinte opção é passada para o construtor do objeto `ol.Map`:

```js
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  })
```

Isto remove o botão `i` e faz com que a informação de atribuição esteja sempre visível.

Tendo dominado as camadas de `tiles` cacheados publicamente disponíveis, trabalharemos a seguir com [camadas raster proprietárias](proprietary.md).

