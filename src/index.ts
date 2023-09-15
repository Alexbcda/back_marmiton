import express from "express"
import "dotenv/config"
import cors from "cors"
import bodyParser from "body-parser"
import { DataTypes, Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const Recette = sequelize.define("Recette", {
  nom_recette: {
    type: DataTypes.STRING,
    field: "nom_recette", // Le nom de la colonne dans la base de données
  },
  lienImage: {
    type: DataTypes.BLOB,
    field: "lienImage", // Le nom de la colonne dans la base de données
  },
  duree: {
    type: DataTypes.INTEGER,
    field: "duree", // Le nom de la colonne dans la base de données
  },
  note: {
    type: DataTypes.INTEGER,
    field: "note", // Le nom de la colonne dans la base de données
  },
});


sequelize.sync()

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030
app.use(cors())
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
  res.json('Hello World!')
})

app.post("/recettes", async (req, res) => {
  const nom_recette = req.body.nomRecette 
  const lienImage = req.body.lienImage 
  const duree = req.body.duree 
  const note = req.body.note

  const nouvelleRecette = await Recette.create({ name: nom_recette, status: true })

  console.log(nom_recette, lienImage, duree, note)
  res.json(nouvelleRecette)
})

app.listen(port, () => {
  console.log(`Listening port on ${port}`)
})