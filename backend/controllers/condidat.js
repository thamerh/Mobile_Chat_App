import Candidat from '../models/condidatModel.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import Moniteur from '../models/moniteurModel.js';
// import { moniteur } from './moniteur';

//@description     create new Candidat
//@route           POST /api/candidat
//@access          Public

export const createCandidat = async (req, res) => {
  const { name, login, password, phone, cin,moniteurId  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    if (!name || !login || !password) {
      res.json({ msg: "Please Enter all the Feilds" });
    }

    const userExists = await Candidat.findOne({ where: { login: login } });

    if (userExists) {
      res.json({ msg: "Candidat already exists" });
    }

    await Candidat.create({
      candidatId:uuidv4(),
      name,
      login,
      password:hashPassword,
      phone,
      cin,
      moniteurId,
      accountType:"condidat"
    });
    res.json({ msg: "Candidat created secessuful" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "user alredy exist" });
  }
};

//@description     get All condidats  
//@route           GET /api/condidat
//@access          Protected
  export const condidat = async(req, res) =>{
    try {
        const response = await Candidat.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }

  
//@description     get single condidat  by id 
//@route           GET /api/condidat/:id
//@access          Protected
export const singleCondidat = async(req, res) =>{
  try {
    let id = req.params.id
     const condidat = await Candidat.findOne({ where: { candidatId:id } });
      res.status(200).json(condidat);
  } catch (error) {
      console.log(error.message);
  }
}
  
  
//@description     update Moniteur by id 
//@route           PUT /api/condidat/:id
//@access          Protected
  
  export const updateCandidat = async (req, res) => {
    try {
      let id = req.params.id
      await Candidat.update(req.body, { where: { candidatId:id }})
      res.status(200).send("condidat is updated");
    } catch (error) {
        console.log(error.message);
    } 
  }
  

//@description     delete Moniteur by id 
//@route           DELETE /api/condidat/:id
//@access          Protected

  export const deleteCandidat = async (req, res) => {
    let id = req.params.id
     const candidat = await Candidat.findOne({ where: { candidatId:id  } });
   if(candidat){
    await Candidat.destroy({ where: { candidatId:id   }} )
    res.status(200).send('condidat is deleted !')
   }else{
    res.status(200).send('condidat not found !')
   }
  }

//@description     Fetch all condidat can moniteur send chats 
//@route           GET /api/condidatMoniteur/:id
//@access          Protected
export const condidatUserChat = async(req, res) =>{
  try {
      let id = req.params.id
     const condidat = await Candidat.findAll({ where: { moniteurId : id } });
      res.status(200).json(condidat);
  } catch (error) {
      console.log(error.message);
  }
}

