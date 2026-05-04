import { annonceSchema } from "../validations/annonce.validation.js";
import * as annoncesModel from "../models/annonce.model.js";

//récup toutes les annonces
export const getAnnonces = async (req,res) => {
    try {
        const annonces = await annoncesModel.getAllAnnonces();

        res.status(200).json(annonces);
    } catch (error) {
        console.error("erreur getAnnonces : ", error);
        res.status(500).json({ message : "Erreur serveur getAnnonces"});
    }
};

// créer annonce
export const createAnnonce = async (req,res) => {
    try {
        const { name , description , price , image_url ,category_id} = req.body;
        const image = req.file ? req.file.path : null;
        const user_id = req.user.id ;

        const { error } = annonceSchema.validate({ name ,description , price , image_url});
        if (error) {
            return res.status(400).json({ "erreur validation Joi :" : error.details[0].message});
        }

        await annoncesModel.createAnnonce({ name , description , price , image_url , user_id , category_id});

        res.status(201).json ({ message : "annonce créer ! ", data : {name , description , price , image_url , user_id , category_id}});
    } catch (error) {
        console.error("erreur createAnnonce : ", error);
        res.status(500).json({ message : "Erreur serveur createAnnonce"});
    }
}

// recup annonce par id 
export const getAnnonceById = async (req,res) => {
    try {
        const { id } = req.params;

        const annonce = await annoncesModel.getAnnoncesById(id);

        if(!annonce){
            return res.status(404).json({ message : "annonce introuvable"});
        }

        res.status(200).json(annonce);

    } catch (error) {
        console.error("erreur getAnnonceById : ", error);
        res.status(500).json({ message : "Erreur serveur getAnnonceById"});
    }
}

// modifier annonce
export const updateAnnonce = async (req,res) => {
    try {
        const { id } = req.params;
        const image = req.file ? req.file.filename : null;

        const existingAnnonce = await annoncesModel.getAnnoncesById(id);
        if (!existingAnnonce) {
            return res.status(404).json({ message : "annonce introuvable"});
        }

        const updatedAnnonce = {
            name : req.body.name ?? existingAnnonce.name,
            description : req.body.description ?? existingAnnonce.description,
            price : req.body.price ?? existingAnnonce.price,
            image_url : image ?? existingAnnonce.image_url}

        const {error} = annonceSchema.validate(updatedAnnonce);
        if(error){
            return res.status(400).json({"erreur validation Joi :" : error.details[0].message});    
        }

        await annoncesModel.updateAnnonce(id , updatedAnnonce);

        res.status(200).json({ message : "annonce modifiée" , data : updatedAnnonce})

    } catch (error) {
        console.error("erreur updateAnnonce : ", error);
        res.status(500).json({ message : "Erreur serveur updateAnnonce"});
    }
}

// suppr annonce 

export const deleteAnnonce = async (req,res) => {
    try {
        const { id} = req.params;

        const deleted = await annoncesModel.deleteAnnonces(id);

        if(!deleted){
            return res.status(404).json({ message : "annonce introuvable"});
        }

        res.status(200).json({ message : "annonce supprimée"})
    } catch (error) {
        console.error("erreur deleteAnnonce : ", error);
        res.status(500).json({ message : "Erreur serveur deleteAnnonce"});
    }
}