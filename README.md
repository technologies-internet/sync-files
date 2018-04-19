# sync-files
Exemple d'un serveur p2p pour échanger des fichiers 

## Utilisation 

Exemple:

        npm install
        mkdir messages-1 messages-2 messages-3 
        node index.js 8001 ./messages-1 http://localhost:8002/ &
        node index.js 8002 ./messages-2 http://localhost:8003/ &
        node index.js 8003 ./messages-3 http://localhost:8001/ http://localhost:8002/ &

Un fichier `*.json` déposé dans un des répertoires `messages-1`, `messages-2`, ou 
`messages-3` va être copié vers les autres.
