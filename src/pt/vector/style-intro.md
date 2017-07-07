# Entendendo estilos

Quando atribuímos estilos a elementos HTML, geramos um CSS com uma estrutura mais ou menos assim:

```css
  .someClass {
    background-color: blue;
    border-width: 1px;
    border-color: olive;
  }
```

`.someClass` é um seletor (neste caso, está selecionando todos os elementos que possuem uma classe chamada `'someClass'`) e o bloco seguinte é um grupo de propriedades e valores, conhecido como declaração de estilos.

## Estilizando camadas

Camadas vetoriais podem ter estilos. Mais especificamente, uma camada vetorial pode ser configurada com um objeto `ol.style.Style`, um array de objetos `ol.style.Style`, ou uma função que aceita como parâmetro um objeto `ol.Feature` e uma resolução, retornando um array de objetos `ol.style.Style`.

Aqui está um exemplo de camada vetorial configurada com um estilo estático:

```js
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      // ...
    })
  });
```

E aqui um exemplo de camada vetorial configurada com uma função de estilo que aplica um estilo para todas as features que tenham um atributo chamado `class` contendo o valor `'someClass'`:

```js
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature, resolution) {
      if (feature.get('class') === 'someClass') {
        // create styles...
        return styles;
      }
    },
  });
```

## `Symbolizers`

O equivalente de um bloco de declaração de estilos em CSS no OpenLayers é um `symbolizer` (são geralmente instâncias de classes `ol.style`). Para desenhar um polígono com cor de fundo azul, linha na cor `olive` e 1 pixel de largura, você poderia utilizar dois `symbolizers` como a seguir:

```js
  new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
    stroke: new ol.style.Stroke({
      color: 'olive',
      width: 1
    })
  });
```

A depender do tipo de geometria, diferentes `symbolizers` podem ser aplicados. Linhas funcionam como polígonos, mas não possuem um preenchimento. Pontos podem ser estilizados com a classe `ol.style.Circle` ou `ol.style.Icon`. O primeiro é usado para renderizar formas circulares, o último para usar imagens de um arquivo (ex. arquivos png). Aqui está um exemplo do primeiro caso:

```js
  new ol.style.Circle({
    radius: 20,
    fill: new ol.style.Fill({
      color: '#ff9900',
      opacity: 0.6
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc00',
      opacity: 0.4
    })
  });
```

## `ol.style.Style`

Um objeto `ol.style.Style` possui quatro chaves: `fill`, `image`, `stroke` and `text`. Possui, além dessas, uma propriedade opcional chamada `zIndex`. A função de estilo retornará um array de objetos `ol.style.Style`.

Se você quiser que todas as features sejam vermelhas, exceto aquelas que possuem o atributo `class` com o valor `"someClass"` (estas você quer que fiquem na cor azul e linha `olive` com 1px de largura), você pode criar uma função de estilo dessa forma (é importante criar objetos de estilo fora da função para que eles possam ser reutilizados, mas aqui criaremos `inline` para manter o exemplo mais simples):

```js
  var primaryStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
    stroke: new ol.style.Stroke({
      color: 'olive',
      width: 1
    })
  });

  var otherStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'red'
    })
  });

  layer.setStyle(function(feature, resolution) {
    if (feature.get('class') === 'someClass') {
      return primaryStyle;
    } else {
      return otherStyle;
    }    
  });
```

*Nota* - É importante criar os estilos fora da função. A função é chamada diversas vezes durante a renderização, e você verá transições mais suaves se suas funções de estilo não gerarem muito `lixo`.

Uma feature também tem a opção de configuração de estilo que aceita somente a resolução como argumento. Isto torna possível estilizar as features de forma individual (baseado na resolução).

## Pseudo-classes

O CSS permite o uso de pseudo-classes nos seletores. Elas, basicamente, limitam a aplicação das declarações de estilo a certos contextos que não são facilmente representados no seletor, como: posição do mouse, vizinhança de elementos ou histórico do navegador. No OpenLayers, existe um conceito similar com a opção `style` de uma interação `ol.interaction.Select`.

Exemplo:

```js
  var select = new ol.interaction.Select({
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.5)'
      })
    })
  });
```

Agora que você já sabe os conceitos básicos dos estilos, é hora de seguir para [estilização de camadas vetoriais](style.md).
