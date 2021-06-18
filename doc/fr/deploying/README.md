# Déploiement

Tout au long du workshop, nous utilisons un serveur de développement pour voir les exemples. Ceci est similaire à la configuration que vous utiliserez lors du développement d'une application avec le [package `ol`](https://www.npmjs.com/package/ol). Lorsque vous êtes prêt à déployer votre application, vous voudrez créer un bundle minifié de votre point d'entrée de l'application avec une étape de build.

Nous avons utilisé [webpack](https://webpack.js.org/) pour le bundling de modules pendant le développement. Le `webpack.config.js` à la racine du répertoire de workshop comprend les profils de configuration du serveur web pour les environnements `dev` et `prod`. Lorsque nous avons démarré le serveur de développement avec `npm start`, nous utilisions le profil` dev`. Le profil `prod` ajoute deux plugins webpack: le [`EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/) et le [`BabiliPlugin`](https://github.com/webpack-contrib/babel-minify-webpack-plugin). Cela constitue un bon point de départ pour votre profil de build `prod`. Explorez les autres [plugins du site web](https://webpack.js.org/plugins/) pour voir ce que vous pourriez souhaiter apporter.

Pour créer des ressources pour le déploiement, nous exécutons notre script `build` à partir de` package.json`:

    npm run build

Cela exécute `webpack --env=prod`, mais ne nécessite pas que` webpack` soit sur notre chemin.

Une fois le build terminé, vous aurez des artefacts dans le répertoire `build`. Ce sont des assets que vous déployeriez sur votre serveur de production (ou S3, ou n'importe où vous souhaitez héberger votre application). Vous pouvez voir à quoi ressemble l'application en ouvrant le fichier `index.html` dans votre navigateur.

    open build/index.html

C'est tout. Vous avez terminé!

