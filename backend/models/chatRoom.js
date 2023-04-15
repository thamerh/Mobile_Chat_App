import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Condidat from "./condidatModel.js";
import Moniteur from "./moniteurModel.js";

const ChatRoom = db.define('chatRoom', {
  roomId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    primaryKey: true,
  },
  lastMessages: {
    type: DataTypes.STRING(1000),
  },
  candidatId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model: Condidat,
      key: 'candidatId',
    },
  },
  moniteurId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model: Moniteur,
      key: 'moniteurId',
    },
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

// Define foreign key relationships
ChatRoom.belongsTo(Moniteur, { foreignKey: 'moniteurId' });
ChatRoom.belongsTo(Condidat, { foreignKey: 'candidatId' });

ChatRoom.sync();

export default ChatRoom;
