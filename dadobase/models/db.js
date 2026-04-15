const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "cadastro",
    "root",
    "senai",
    {
        host:"localhost",
        dialect: "mysql"
    }
);
sequelize.authenticate().then((function(){
console.log("banco de dados conectado com sucesso")

})).catch(function(erro){
    console.log("erro ao se conectar ao banco de dados" + erro);
});
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
} 