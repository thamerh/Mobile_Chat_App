import {Sequelize} from "sequelize";

const db = new Sequelize('chatapp','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;