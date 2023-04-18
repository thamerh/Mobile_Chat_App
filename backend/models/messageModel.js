import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ChatRoom from "./chatRoom.js";

const { DataTypes } = Sequelize;

const Message = db.define('message', {
    messageId: {
        type: DataTypes.STRING(250),
        allowNull: false,
        primaryKey: true,
      },
      messages: {
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
      sender: {
        allowNull: false,
        type: DataTypes.STRING(250),
      },
      receiver: {
        allowNull: false,
        type: DataTypes.STRING(250),
      },
      isView: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      chatRoomId: {
        type: DataTypes.STRING(250),
        allowNull: false,
        references: {
          model: ChatRoom,
          key: 'roomId',
        }
      }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});
Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId'});
Message.sync();

export default Message;