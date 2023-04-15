import express from "express";
import Protect from "../middleware/Authorization.js";
import {createMoniteur,Login,moniteur,updateMoniteur,deleteMoniteur,singleMoniteur,moniteurCondidatId} from "../controllers/moniteur.js"
import {createCandidat,condidat,singleCondidat,updateCandidat,deleteCandidat,condidatUserChat} from "../controllers/condidat.js"
import {CreateChat,GetChats,GetRoomMessage,AddMessage,GetChatsCondidat,GetChatsMoniteur,DeleteMessage,DeleteChatRoom,GetChat} from "../controllers/Chat.js"

const router=express.Router()
// moniteur routes
router.post('/api/moniteur',createMoniteur)
router.get('/api/moniteur',moniteur)
router.get('/api/moniteur/:id',singleMoniteur)
router.put('/api/moniteur/:id',updateMoniteur)
router.delete('/api/moniteur/:id',deleteMoniteur)
// condidat routes
router.post('/api/condidat',createCandidat)
router.get('/api/condidat',condidat)
router.get('/api/condidat/:id',singleCondidat)
router.put('/api/condidat/:id',updateCandidat)
router.delete('/api/condidat/:id',deleteCandidat)
// Login for condidat && moniteur routes
// router.post('/api/login',Login)
// router.post('/api/chat',Protect,CreateChat)
// router.get('/api/chat',Protect,GetChats)
// router.post('/api/message',Protect,AddMessage)
// router.get('/api/chatRoom/:id',Protect,GetRoomMessage)
// // router.get('/api/chatRoomCondidat/:id',GetChatsCondidat)
// // router.get('/api/chatRoomMoniteur/:id',GetChatsMoniteur)
// router.delete('/api/message/:id',Protect,DeleteMessage)
// router.delete('/api/chat/:id',Protect,DeleteChatRoom)
// router.get('/api/condidatMoniteur/:id',Protect,condidatUserChat)
// router.get('/api/chat/:role/:id',Protect,GetChat)
// router.get('/api/moniteurByCondidat/:id',Protect,moniteurCondidatId)

//not protected just for testing
router.post('/api/chat',CreateChat)
router.get('/api/chat',GetChats)
router.post('/api/message',AddMessage)
router.get('/api/chatRoom/:id',GetRoomMessage)
// router.get('/api/chatRoomCondidat/:id',GetChatsCondidat)
// router.get('/api/chatRoomMoniteur/:id',GetChatsMoniteur)
router.delete('/api/message/:id',DeleteMessage)
router.delete('/api/chat/:id',DeleteChatRoom)
router.get('/api/condidatMoniteur/:id',condidatUserChat)
router.get('/api/chat/:role/:id',GetChat)
router.get('/api/moniteurByCondidat/:id',moniteurCondidatId)


export default router;