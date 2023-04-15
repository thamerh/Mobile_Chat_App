import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Moniteur from "./moniteurModel.js";

const { DataTypes } = Sequelize;

const Candidat = db.define('candidat', {
  candidatId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  login: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  cin: {
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
  },
  solde: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0,
  },
  nbSession: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  nbsessionEffected: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  amountPaid: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0,
  },
  amountRequired: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  phone: {
    type: DataTypes.STRING(8),
    allowNull: true,
  },
  accountStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  accountType: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  pic: {
    type: DataTypes.STRING(300),
    allowNull: false,
    defaultValue: 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg',
  },
  moniteurId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model : Moniteur,
      key: 'moniteurId',
    },
    
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Candidat.belongsTo( Moniteur,{ foreignKey: 'moniteurId' });
Candidat.afterDestroy(async (condidat, options) => {
  // Delete all related tables here (for resolved cant delete table condidat because condidat id like forginkey in ChatRoom table)
  await ChatRoom.destroy({ where: { condidatId: condidat.candidatId }});
});
Candidat.sync();

export default Candidat;