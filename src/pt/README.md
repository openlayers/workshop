# OpenLayers Workshop

Bem-Vindo ao **OpenLayers Workshop**. Este workshop tem por objetivo fornecer uma visão geral sobre o OpenLayers como uma solução webmapping.

## Preparação do ambiente

Estas instruções assumem que você fez download do arquivo `openlayers-workshop-pt.zip` da [última versão do workshop](https://github.com/openlayers/workshop/releases).  Além disso, você precisará do [Node](https://nodejs.org/) instalado para rodar o servidor de desenvolvimento da biblioteca OpenLayers.

Após descompactar o zip, entre no diretório `openlayers-workshop-pt` e instale as dependências adicionais:

    npm install

Agora você está pronto para inicializar o servidor do workshop. Ele disponibiliza a documentação do workshop, bem como um carregador de depuração para a biblioteca OpenLayers.

    npm start

Este comando inicializará o servidor de desenvolvimento no qual você poderá ler a documentação e fazer os exercícios: {{ book.workshopUrl }}.

## Visão Geral

Este workshop é apresentado como um conjunto de módulos. Em cada um dos módulos, você realizará um conjunto de tarefas projetadas para atingir o objetivo específico daquele módulo. Cada módulo é desenvolvido sobre as lições aprendidas nos módulos anteriores e é concebido para construir uma base de conhecimento de forma iterativa.

Os seguintes módulos serão abordados neste workshop:

* [O básico](basics/README.md) - Aprenda como adicionar um mapa em uma página web com o OpenLayers.
* [Camadas e Fontes de Dados](layers/README.md) - Aprenda sobre comadas e fontes de dados.
* [Controles e Interações](controls/README.md) - Aprenda como usar controles e interações dos mapas.
* [Tópico sobre vetores](vector/README.md) - Explore camadas vetorias em profundidade.
* [`Builds` customizados](custom-builds/README.md) - Crie `builds` personalizados.
