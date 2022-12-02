# POSTGRESQL_INTEGRATION

## [FR] Description:

- Application Web avec Angular qui intègre PostgreSQL.

## [EN] Description:

- Angular web app integrating PostgreSQL.

## Auteurs / Authors:
- Franck Tiomo
- Ewald Djangui

## [FR] Pour utiliser l'application...
- Assurez-vous d'avoir installé PostgreSQL (la version ~8.2 est utilisée pour ce projet).
- Assurez-vous d'avoir installé Node (la version ^16 est utilisée pour ce projet).
- Allez dans `/client` et lancez la commande `npm install` dans un terminal.
- Allez dans `/server` et lancez la commande `npm install` dans un terminal.
- Allez dans `/server/app/services/database.service.ts` et modifiez `connectionConfig` avec les bons paramètres de votre BD.
- Allez dans `/server` et faites la commande `npm start` dans un terminal. Le serveur est lancé au `localhost:3000` par défaut.
- Allez dans `/client` et faites la commande `npm start` dans un terminal. Le client est lancé au `localhost:4200` par défaut.

## [EN] To use this app...
- Be sure to have PostgreSQL installed (version ~8.2 is used for this project).
- Be sure to have Node installed (version ^16 is used for this project).
- Go to `/client` and type `npm install` in a terminal.
- Go to `/server` and type `npm install` in a terminal.
- Go to `/server/app/services/database.service.ts`, and modify `connectionConfig` with your database settings.
- Go to `/server` and type `npm start` in a terminal. Server is active on `localhost:3000` by default.
- Go to `/client` and type `npm start` in a terminal. Client is active on `localhost:4200` by default.

Cette application s'est fortement inspirée de celle qui se trouve sur ce lien : https://github.com/DaddyChucky/POSTGRESQL_INTEGRATION
