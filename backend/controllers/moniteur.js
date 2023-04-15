import Moniteur from "../models/moniteurModel.js";
import Candidat from "../models/condidatModel.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ChatRoom from "../models/chatRoom.js";

//@description     create new moniteur
//@route           POST /api/moniteur
//@access          Public

export const createMoniteur = async (req, res) => {
  const { name, login, password, phone, cin, salaire } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    if (!name || !login || !password) {
      res.json({ msg: "Please Enter all the Feilds" });
    }

    const userExists = await Moniteur.findOne({ where: { login: login } });

    if (userExists) {
      res.json({ msg: "Moniteur already exists" });
    }

    await Moniteur.create({
      MoniteurId:uuidv4(),
      name,
      login,
      password:hashPassword,
      phone,
      cin,
      salaire,
      accountType:"moniteur"
    });
    res.json({ msg: "Moniteur created secessuful" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: error });
  }
};

//@description     Authentification Moniteur+condidat exist
//@route           POST /Login
//@access          Public
export const Login = async(req, res) => {
    const { login, password } = req.body;
      try {
          const condidat =await Candidat.findOne({ where: { login: login } });
          const user = await Moniteur.findOne({ where: { login: login } });
          if(condidat){
            const match = await bcrypt.compare(password,condidat.password);
            if ( condidat.accountStatus==true && match) {
                const userId=condidat.condidatId;
                const token= jwt.sign({userId}, process.env.JWT_SECRET, {
                  expiresIn: "7d"},
                  )
                //console.log(token)
                res.json({
                  id: condidat.candidatId,
                  name: condidat.name,
                  login: condidat.login,
                  phone: condidat.phone,
                  cin: condidat.cin,
                  accountStatus: condidat.accountStatus,
                  solde: condidat.solde,
                  cin: condidat.cin,
                  nbSession:condidat.nbSession,
                  nbsessionEffected:condidat.nbsessionEffected, 
                  amountPaid:condidat.amountPaid,
                  amountRequired:condidat.amountRequired,
                  MoniteurId: condidat.moniteurId,
                  token: token,
                  accountType:condidat.accountType

                });
              }else {
                res.json({ msg: "Your account is deactivated" });
              } 
            
          }else if (user!=null){
            const match = await bcrypt.compare(password,user.password);
            if (user.accountStatus==true && match) {
                const userId=user.MoniteurId;
                const token= jwt.sign({userId}, process.env.JWT_SECRET, {
                  expiresIn: "7d"},
                  )
                res.json({
                  id: user.MoniteurId,
                  name: user.name,
                  login: user.login,
                  phone: user.phone,
                  cin: user.cin,
                  accountStatus: user.accountStatus,
                  salaire: user.salaire,
                  cin: user.cin,
                  token: token,
                  accountType:user.accountType
                });
              } else {
                res.json({ msg: "Your account is deactivated" });
              } 
          }else {
            res.json('user not found');
          }
         
    //       console.log(match)
    //  console.log(user)
      
      } catch (error) {
          res.status(404).json({msg:"Invalid Email or Password"});
      }
  }



  //get all Moniteur 
export const moniteur = async(req, res) =>{
    try {
        const response = await Moniteur.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }

   //get single Moniteur 
export const singleMoniteur = async(req, res) =>{
  try {
    let id = req.params.id
     const moniteur = await Moniteur.findOne({ where: { MoniteurId:id } });
      res.status(200).json(moniteur);
  } catch (error) {
      console.log(error.message);
  }
}

//get single Moniteur 
export const moniteurCondidatId = async(req, res) =>{
  try {
    let id = req.params.id
    const condidat = await Candidat.findOne({ where: { candidatId:id} });
     const moniteur = await Moniteur.findOne({ where: { MoniteurId:condidat.moniteurId } });
      res.status(200).json(moniteur);
  } catch (error) {
      console.log(error.message);
  }
}
  
  
  // 4. update Moniteur 
  
  export const updateMoniteur = async (req, res) => {
    let id = req.params.id
    await Moniteur.update(req.body, { where: { MoniteurId:id }})
    res.status(200).send("Moniteur is updated")
  }
  
  // 5. delete Moniteur by id
  
  export const deleteMoniteur = async (req, res) => {
    let id = req.params.id
     const moniteur = await Moniteur.findOne({ where: { MoniteurId:id } });
    // console.log(lesson)
   if(moniteur){
    await ChatRoom.destroy({ where: { moniteurId:id  }} )
    await Candidat.destroy({ where: { moniteurId:id  }} )
    await Moniteur.destroy({ where: { MoniteurId:id  }} )
   }
    res.status(200).send('Moniteur is deleted !')
  }



