//O proposito de vida desse código é gerenciar o processo de busca/inserção/alteração de dados no banco de dados através de uma escuta das requisições http que chegam na rota.

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//postman: ferramenta para fazer requisições http. só funciona em localhost se tiver o postman agent instalado para desktop.
//router.(get,post ou delete) são os métodos das requisições http.

//Buscar posts
//caso seja uma requisição http com o método get
router.get('/', async(req,res) => { //aqui a "/" significa "/api/posts" pq a gnt fez um direcionamento desse caminho para esse arquivo lá no arquivo index.js
    const posts = await loadPostsCollection(); //sempre usamos await para funções. Atribui à variável posts o comando de conexão à coleção de posts do banco.
    res.send(await posts.find({}).toArray()); //o método find serve como uma query no banco que retorna as entradas encontradas de acordo com o especificado. Neste caso como não passamos parâmtros adicionais retornará todos os documentos do banco. ".toArray()" significa que queremos o retorno em formato de array
});


//Adicionar posts
//caso seja uma requisição http com o método post
router.post('/', async(req,res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({ //insertOne insere um registro no BD.
        text: req.body.text,
        createdAt: new Date()  
    })
    res.status(201).send(); //201 significa que ocorreu tudo bem, mas tb significa que algo foi criado com sucesso. Teoricamente é uma advinhação pelo que entendi, pq n tem nenhuma verificação pra saber se foi tudo bem mesmo.

});

//Deletar posts
//caso seja uma requisição http com o método delete
router.delete('/:identificacao', async (req, res) => {  //"'/:identificacao'" pega tudo que vem depois da barra em ".../api/posts" e diz que vai se chamar "id".
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.identificacao) });//req.params.identificacao trás a informação de id inserida na requisição http. Nesse caso é ".identificacao" pq chamamos de id ali em cima
                                                                                  // porém, como estamos usando o driver do mongo db, "id" é uma palavra reservada, de forma que precisamos passar dentro do "new mongodb.ObjectId()"
    //await posts.deleteMany({text: req.params.identificacao}); //exemplo adicional onde deleto todos os documentos com o texto igual ao passado na requisição.
    res.status(200).send();
});

//Função para conectar à nossa coleção de posts no banco de dados.
async function loadPostsCollection (){
    const client = await mongodb.MongoClient.connect('mongodb+srv://huoli:15122021@cluster0.4fueh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true //corrige um aviso que não sei qual.
    });

    return client.db('preCadastro').collection('dadosPreCadastro'); //pegar a coleção de posts para que possamos usar métodos do banco nela.
}

module.exports = router; //exportar o router