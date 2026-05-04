import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnnonceById } from "../services/annonces.service.js";

function Annonce() {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnonceById(id)
      .then((data) => setAnnonce(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!annonce) return <p>Annonce introuvable</p>;

  return (
    <>
    <Link className="font-bold hover:text-blue-500 hover:underline transition-all m-10" to="/">Retour à l'accueil</Link>
    <div className="max-w-3xl mx-auto px-4 py-8 border border-gray-300 shadow-2xl rounded-2xl m-10">
      <img
        src={annonce.image_url}
        alt={annonce.name}
        className="w-full h-64 object-cover rounded-xl"
      />
      <h1 className="text-2xl ml-auto mr-auto font-bold mt-4">{annonce.name}</h1>
      <p className="text-blue-600 font-bold text-xl mt-2">{annonce.price} €</p>
      <h2 className="text-lg font-semibold mt-4">Description : </h2>
      <p className="text-gray-600 mt-4">{annonce.description}</p>
    </div>
    </>
  );
}

export default Annonce;
