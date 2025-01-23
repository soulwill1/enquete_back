Este repositório contém os arquivos backend para um sistema de enquetes feito em node.js que podem ser encontrados no link: https://github.com/soulwill1/estudos/enquete

Como utilizar?<br/>
Suba um servidor mysql e crie uma database.

Rode os comandos: npm install em seguida, utilize o prisma para popular a database com o comando: npx prisma migrate dev --name init

Para rodar o servidor basta utilizar o comando $node src/main.js
