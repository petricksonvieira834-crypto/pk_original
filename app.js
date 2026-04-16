const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produtos = require("./dadobase/models/Produtos");





//Configurar BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/cadastro",function(req, res){
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    }).then(function(){
        res.send("Produto cadastrado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao cadastrar o produto " + erro);
    });
});
// app.get("/artigos/:id", function(req,res){
//   if(req.params.id == "1"){
//   res.send("1 - Como criar aplicativos")
//   }else if(req.params.id == "2"){
//   res.send("2 - Como usar o Nodes.js")
//  }else if(req.params.id == "3"){
//   res.send("3 - Como usar o Express")
//   }else{
//      res.send("Não foi encontrado")
//    }
// });

app.get("/contato", function(req,res){
    res.send("Deixa sua menssagem..")
});

app.get("/",function(req,res){
    Produtos.findAll().then(function(produtos){
        res.send({produtos: produtos})  
    }).catch(function(erro){res.send("erro ao buscar os dados " + erro);

    })



});


app.get("/:nome",function(req,res){
    Produtos.findAll({where: {"nome": req.params.nome}}).then(function(produto){
        res.send(produto);
    }).catch(function(erro){
     res.send( "produto nao existe na base de dados" + erro);
    });



});


 app.patch("/atualizar/:id",function(req,res){
       Produtos.update({ 
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao}, 
        {where: {"id": req.params.id} }

    ).then(function(){  
        res.send("sucesso ao atualiza os dados do produto" );
    }).catch(function(erro){
        res.send("erro ao atualizar os dados" + erro);
    })


 });

 app.delete("/deletar/:id",function(req,res){
    Produtos.destroy({where: {"id": req.params.id}}).then(function(){
        res.send("produto deletado com sucesso!");
    }).catch(function(erro){ 
        res.send("erro ao deletar dados" + erro);
    });



 });
const PORT = process.env.PORT || 8081;
app.listen(PORT,"0.0.0.0",function(){
    console.log("Servidor está rodando..")

});