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
  },
lienImage: {
    type: DataTypes.BLOB,
  }, 
  duree: {type: DataTypes.INTEGER, 
  },
  note: {type: DataTypes.INTEGER, 
  }

})


sequelize.sync()

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030
app.use(cors())
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
  res.json('Hello World!')
})

app.post("/recettes", async (req, res) => {
  const nomRecette = req.body.nomRecette 
  const lienImage = req.body.lienImage 
  const duree = req.body.duree 
  const note = req.body.note

  const nouvelleRecette = await Recette.create({ name: nomRecette, status: true })

  console.log(nomRecette, lienImage, duree, note)
  res.json(nouvelleRecette)
})

app.listen(port, () => {
  console.log(`Listening port on ${port}`)
})