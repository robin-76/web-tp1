# Web - TP1

Création d'un site Web de gestion d'annonces de biens immobiliers en utilisant les technologies Express.js et MongoDB.

# Commandes pour lancer le serveur
Se mettre dans le répertoire :

    cd Web_TP1

Installer les dépendances :

    npm install

Installer nodemon : 

    npm install --save-dev nodemon

Installer Font awesome icons :

    npm install --save @fortawesome/fontawesome-free

Installer mongoose : 

    npm install mongoose
    
Lancer le serveur :

    npm start

ou 

    nodemon --exec npm start

Lien du serveur : http://localhost:3000

Dans un autre terminal : 

    cd Web_TP1/

    mongoimport --jsonArray --db testDB --collection tests --file dblp.json

