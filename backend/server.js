import express from "express";
import db from "./config/Database.js";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

// testing 
app.get('/', (req, res) => {
  res.json({ success: true, message: "welcome to backend zone"});
});
const port=process.env.PORT || 8000

app.listen(port,console.log(`server started in port ${port}`));
