const express = require('express');
const bodyParser = require('body-parser'); // parece que serve para analisar/retirar informações arquivos jason
const cors = require('cors'); //serve para corrigir um erro do chrome que eu n entendi direito (cross-origin) 
                              //parece que o crhome é meio restritivo para solicitações para outros dominios e isso aqui resolve isso

                              //nodemon parece que serve para rastrear mudanças de codigo e aplicar automaticamente

const app = express(); //iniciando o aplicativo com express

// Middleware (software que fornece serviços e recursos comuns a aplicações) 

app.use(bodyParser.json()); //não sei exatamente o que está acontecendo aqui. 
app.use(cors()); //""

const posts = require('./routes/api/posts'); // faz o link entre o arquivo posts e esse arquivo.
app.use('/api/posts', posts); //redirecionamento qualquer rota que requira esse caminho para o caminho do arquivo correto. 

const port = process.env.PORT || 5000; //tem a ver com o heroku mas não entendi direito. A segunda opção é para o localhost na porta 5000

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`)); //Inicia o servidor e apresenta uma mensagem no console