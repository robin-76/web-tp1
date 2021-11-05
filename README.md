# Web - TP1

Création d'un site Web de gestion d'annonces de biens immobiliers en utilisant les technologies Express.js et MongoDB.

# Commandes pour lancer le serveur
Se mettre dans le répertoire :

    cd Web_TP1

Installer les dépendances :

    npm i
    
Lancer le serveur :

    npm start

Lien du serveur : http://localhost:3000

Pour vérifier la base de données :

Dans un nouveau terminal,

    mongo

    show dbs

    use LeBonLogement

    show collections

Afficher les annonces créées :

    db.ads.find().pretty()

Afficher les utilisateurs créés :

    db.users.find().pretty()

Afficher les sessions créées :

    db.sessions.find().pretty() 

Afficher les commentaires des utilisateurs : 

    db.comments.find().pretty()