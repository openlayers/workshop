# Dissecando o seu mapa

Como demonstrado na [seção anterior](./map.md), um mapa é gerado a partir da junção da marcação, declarações de estilo e código de inicialização. Olharemos cada uma dessas partes com um pouco mais detalhe.

## Marcação HTML para o mapa

A marcação para o mapa no [exemplo anterior](./map.md) criou um elemento DOM único:

```html
  <div id="map"></div>
```

Este elemento `<div>` servirá como contêiner para visualização de nosso mapa. Aqui usamos um elemento `<div>`, mas o contêiner pode ser qualquer elemento do tipo "block".

Neste caso, fornecemos um `id` para o elemento, dessa forma, podemos referênciá-lo como `target` de nosso mapa.


## Estilo do mapa

O OpenLayers vem com uma folha de estilo padrão que especifica como os elementos relacionados ao mapa devem ser exibidos. Nós temos que incluí-la na página `map.html` (`<link rel="stylesheet" href="/ol.css" type="text/css">`).

O OpenLayers não atribui nenhum tamanho padrão para o seu mapa. Assim, seguindo a folha de estilo default, nós precisamos incluir, no mínimo, uma declaração para informar o tamanho que o mapa ocupará na página.

```html
  <link rel="stylesheet" href="/ol.css" type="text/css">
  <style>
    #map {
      height: 256px;
      width: 512px;
    }
  </style>
```

Neste caso, nós estamos usando o `id` da div definida anteriormente como seletor e especificando a largura (`512px`) e a altura (`256px`) do mapa.

Estas declarações de estilo estão incluídas diretamente no `<head>` de nosso documento. Na maioria dos casos, as declarações de estilo relacionadas ao seu mapa ficarão em um arquivo CSS externo.

## Inicialização do Mapa

O próximo passo para gerar o seu mapa é incluir algum código para inicializá-lo. No nosso caso, incluímos o elemento `<script>` na parte inferior do elemento `<body>` do documento.

```html
  <script>
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
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
```

A ordem desses passos é importante. Antes do nosso script ser executado, o OpenLayers deve ser carregado. No nosso exemplo, o OpenLayers é carregado no `<head>` do documento com o elemento `<script src="/loader.js"></script>`.

De forma semelhante, a inicialização do nosso mapa no código acima, não pode ser executada até que o elemento que servirá como contêiner, neste caso o `<div id="map"></div>`, estar pronto. Incluindo o código na parte inferior do elemento `<body>`, nós garantimos que o código da biblioteca está carregado e que o contêiner está pronto para receber nosso mapa.

Vamos olhar com mais detalhe o que o código de inicialização do mapa está fazendo. Nosso script cria um novo objeto `ol.Map` com algumas opções de configuração:

```js
  target: 'map'
```

Nós usamos o `id` do contêiner para informar ao construtor do objeto onde o mapa deve ser renderizado. Neste caso, passamos a string `"map"` como `target` para o construtor do mapa. Esta sintaxe é um atalho para conveniência. Nós poderíamos ser mais explícitos e fornecer uma referência direta para o elemento (ex. `document.getElementById("map")`).

O trecho `layers` configura uma camada que será exibida em nosso mapa:

```js
  layers: [
    new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {LAYERS: 'nasa:bluemarble', TILED: true}
      })
    })
  ],
```

Não se preocupe com a sintaxe aqui se ela for nova pra você. A criação de camadas será vista em outro módulo. A parte importante é entender que a visualização de nosso mapa é uma coleção de camadas. Para ver um mapa, nós precisamos incluir pelo menos uma camada.

O passo final é a definição da `view`. Nós especificamos uma projeção (`projection`), um centro (`center`) e um nível de zoom (`zoom`). Nós também fornecemos uma resolução máxima (`maxResolution`) para garantir que não faremos requisições de `bounding boxes` que o GeoWebCache não possa antender.

```js
  view: new ol.View({
     projection: 'EPSG:4326',
     center: [0, 0],
     zoom: 0,
     maxResolution: 0.703125
  })
```

Você acaba de dissecar com sucesso o seu primeiro mapa! Em seguida, [aprenderemos mais](./resources.md) sobre o desenvolvimento com o OpenLayers.