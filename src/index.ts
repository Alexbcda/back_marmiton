import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

const Recette = sequelize.define("Recette", {
  nom_recette: {
    type: DataTypes.STRING,
    allowNull: false, // Assurez-vous que le nom de la recette n'est pas nul
  },
  lienImage: {
    type: DataTypes.STRING,
  },
  duree: {
    type: DataTypes.INTEGER,
  },
  note: {
    type: DataTypes.INTEGER,
  },
});

// Synchronisez le modèle avec la base de données
sequelize.sync().then(() => {
  console.log("La base de données est synchronisée.");
});

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030;

app.use(cors());
app.use(bodyParser.json());

// Récupérer toutes les recettes
app.get("/recettes", async (req, res) => {
  try {
    const recettes = await Recette.findAll();
    res.json(recettes);
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des recettes" });
  }
});

// Créer une nouvelle recette
app.post("/recettes", async (req, res) => {
  const { nom_recette, lienImage, duree, note } = req.body;

  try {
    const nouvelleRecette = await Recette.create({
      nom_recette,
      lienImage,
      duree,
      note,
    });

    res.json(nouvelleRecette);
  } catch (error) {
    console.error("Erreur lors de la création de la recette :", error);
    res.status(500).json({ message: "Erreur lors de la création de la recette" });
  }
});

// Supprimer une recette par son ID
app.delete("/recettes/:id", async (req, res) => {
  const recetteId = req.params.id;

  try {
    const recette = await Recette.findByPk(recetteId);

    if (!recette) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    await recette.destroy();

    res.json({ message: "Recette supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la recette :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de la recette" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
