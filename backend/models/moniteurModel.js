import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const Moniteur = db.define('moniteur', {
  MoniteurId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  login: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  cin: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  accountStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  pic: {
    type: DataTypes.STRING(300),
    allowNull: false,
    defaultValue: 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg',
  },
  salaire: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  accountType: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
// sync the table
Moniteur.sync();
// or use { force: true } to drop the table and re-create it
// Moniteur.sync({ force: true });
export default Moniteur;
