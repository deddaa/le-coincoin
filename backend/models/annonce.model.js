import { db } from "../config/db.js";

//récup les annonces
export const getAllAnnonces = async (search = "") => {
  try {
    const query = search
      ? "SELECT * FROM annonces WHERE name LIKE ? OR description LIKE ?"
      : "SELECT * FROM annonces";
    const params = search ? [`%${search}%`, `%${search}%`] : [];
    const [rows] = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error("Erreur getAllAnnonces : ", error);
    throw error;
  }
};

//créer une annonce
export const createAnnonce = async (data) => {
  try {
    await db.query(
      "INSERT INTO annonces (name , description , price , image_url , user_id , created_at , category_id) VALUES (?,?,?,?,?,?,?)",
      [
        data.name,
        data.description,
        data.price,
        data.image_url,
        data.user_id,
        new Date(),
        data.category_id,
      ],
    );
  } catch (error) {
    console.error("Erreur createAnnonces : ", error);
    throw error;
  }
};

//récup annonces par id 
export const getAnnoncesById = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM annonces WHERE id = ?", [id]);
        return rows[0];
    } catch (error) {
        console.error("Erreur getAnnoncesById : ", error);
        throw error;
    }
}

//modifier annonces
export const updateAnnonce = async (id , data) => {
    try {
        await db.query(
            "UPDATE annonces SET name=? , description=? , price=? , image_url=?,  category_id=? WHERE id=?",
            [
                data.name,
                data.description,
                data.price,
                data.image_url,
                data.category_id,
                id
            ]
        )
    } catch (error) {
        console.error("Erreur updateAnnonce : ", error);
        throw error;
    }
}

//supprimer une annonce
export const deleteAnnonces = async (id) => {
    try {
        const [res] = await db.query("DELETE FROM annonces WHERE id= ?", [id]);

        return res.affectedRows > 0;
    } catch (error) {
        console.error("Erreur deleteAnnonces : ", error);
        throw error;
    }
}