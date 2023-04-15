import Message from "../models/messageModel.js";
import { v4 as uuidv4 } from 'uuid';
import ChatRoom from "../models/chatRoom.js";


//@description     create chatRoom
//@route           POST /api/chat
//@access          Protected
export const CreateChat  = async (req, res) => {
  const {candidatId,moniteurId} = req.body;
  try {
    const chat = await ChatRoom.findOne({ where: { candidatId: candidatId, moniteurId: moniteurId } });
    if(!chat){
     const room= await ChatRoom.create({
        roomId:uuidv4(),
        candidatId,
        moniteurId,
      });
  
      res.json(room);
    }else{
      res.json(chat);

    }
   
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "error" });
  }
  };

//@description     Add message
//@route           POST /api/message
//@access          Protected
export const AddMessage = async (req, res) => {
  const {messages,senderId,receiverId,chatRoomId  } = req.body;
  try {
    if (!senderId||!receiverId||!messages||!chatRoomId) {
      console.log("impossible send empty message");
      res.json({ msg: "Please Enter all the Feilds" });
    }
    await Message.create({
      messageId:uuidv4(),
      messages,
      sender:senderId,
      receiver:receiverId,
      chatRoomId
    });
    await ChatRoom.update({"lastMessages":messages},{ where: { roomId:chatRoomId }})
    res.json({ msg: "Message created secessuful" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "error" });
  }
  };
//@description     Fetch all chats for a user
//@route           GET /api/chat
//@access          Protected
export const GetChats = async (req, res) => {
    try {
    const chat = await ChatRoom.findAll();
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(`error: ${error.message}`);
    //   throw new Error(error.message);
    }
  };
//@description     Fetch all chats for a condidat
//@route           GET /api/chatRoomCondidat/:id
//@access          Protected
export const GetChatsCondidat = async (req, res) => {
  const candidatId = req.params.id

  try {
  const chat = await ChatRoom.findAll({ where: { candidatId : candidatId } });
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  //   throw new Error(error.message);
  }
};

//@description     Fetch all chats for a moniteur
//@route           GET /api/chatRoomMoniteur/:id
//@access          Protected
export const GetChatsMoniteur = async (req, res) => {
  const moniteurId = req.params.id

  try {
  await ChatRoom.destroy({ where: { lastMessages : null } });
  const chat = await ChatRoom.findAll({ where: { moniteurId : moniteurId } });
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  //   throw new Error(error.message);
  }
};

//@description     Fetch all chats for a user
//@route           GET /api/chatRoom/:id
//@access          Protected
export const GetRoomMessage = async (req, res) => {
  const id = req.params.id
  try {
    const message = await Message.findAll({ where: { chatRoomId : id } });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  //   throw new Error(error.message);
  }
};

//@description     delete message for user
//@route           DELETE /api/message/:id
//@access          Protected
export const DeleteMessage = async (req, res) => {
  const id = req.params.id
  try {
     await Message.destroy({ where: { messageId : id } });
    res.status(200).send('message is deleted !')
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  //   throw new Error(error.message);
  }
};

//@description     delete chatRoom and all message for user
//@route           DELETE /api/message/:id
//@access          Protected
export const DeleteChatRoom = async (req, res) => {
  const id = req.params.id
  try {
     await Message.destroy({ where: { chatRoomId : id } });
     await ChatRoom.destroy({ where: { roomId : id } });
    res.status(200).send('chatRoom is deleted is deleted !')
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  //   throw new Error(error.message);
  }
};

//@description     Fetch all chats for a user
//@route           GET /api/chatRoomCondidat/:id
//@access          Protected
export const GetChat = async (req, res) => {
  const userId = req.params.id
  const role = req.params.role
  try {
    if(!userId||!role){
      res.json("Please Enter all the Feilds");
    }
    if(role=="condidat"){
      await ChatRoom.destroy({ where: { lastMessages : null } });
      const chat = await ChatRoom.findAll({ where: { candidatId : userId } });
      res.status(200).json(chat);
    }else if(role=="moniteur"){
      await ChatRoom.destroy({ where: { lastMessages : null } });
      const chat = await ChatRoom.findAll({ where: { moniteurId : userId } });
        res.status(200).json(chat);
    }
  
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  //   throw new Error(error.message);
  }
};