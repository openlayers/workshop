# Recursos sobre o OpenLayers

O OpenLayers contém um vasto número de funcionalidades. Embora os desenvolvedores tenham trabalhado duro para criar exemplos destas funcionalidades e tenham organizado o código de forma a permitir que outros desenvolvedores experientes possam descobrí-las por conta própria, muitos usuários encontram dificuldades para começar do zero.

## Aprenda a partir dos exemplos

Novos usuários, provavelmente, acharão que mergulhar nos exemplos do OpenLayers é a melhor forma de começar.

* http://openlayers.org/en/master/examples/

## Consulte a documentação

Para mais informações sobre tópicos específicos, navegue pela crescente documentação do OpenLayers.

* http://openlayers.org/en/master/doc/quickstart.html
* http://openlayers.org/en/master/doc/tutorials

## Encontre a referência da API

Depois de entender os componentes básicos que constroem e controlam o mapa, procure na documentação da API detalhes sobre as propriedades e os métodos disponibilizados pelos objetos. Se você quer ver somente a parte estável da API, certifique-se de marcar a caixa de seleção `Stable Only`.

* http://openlayers.org/en/master/apidoc/

## Faça parte da comunidade

O OpenLayers é suportado e mantido pela comunidade de desenvolvedores e por usuários como você. Se tem perguntas ou código para contribuir, você pode utilizar a tag `openlayers` no Stack Overflow ou pode ingressar no grupo de discussão de desenvolvedores.

* http://stackoverflow.com/questions/tagged/openlayers
* https://groups.google.com/forum/#!forum/openlayers-dev

## Reportando problemas

Para reportar problemas é importante entender as maneiras como a biblioteca OpenLayers é distribuída:

* `ol.js` - script que é feito utilizando o compilador Closure em modo avançado (não legível por humanos)
* `ol-debug.js` - versão legível para humanos utilizada durante o desenvolvimento

Quando encontrar um bug, é importante que reporte utilizando a versão `ol-debug.js`. Também inclua a pilha completa da exceção. Você pode visualizá-la por meio de ferramentas de desenvolvimento Web, como a `Developer Tools` disponível no Chrome. Para fazer um teste, faremos um erro proposital no arquivo map.html trocando `ol.layer.Tile` por `ol.layer.Image`. A exceção que você verá é: `Uncaught TypeError: undefined is not a function`. Se reportar esse erro para o grupo de discussão, ninguém irá saber do que se trata. Assim, a primeira coisa a fazer, é mudar a tag script para que ela aponte para `ol-debug.js` ao invés de `ol.js`. Recarregue a página. O depurador agora irá parar no local do erro e podemos ver a pilha completa da exceção.

![Um breakpoint no depurador](debugger.png)
