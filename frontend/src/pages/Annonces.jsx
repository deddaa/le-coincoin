import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllAnnonces } from "../services/annonces.service";
import Button from "../components/ui/Button";

function Annonces() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const data = await getAllAnnonces(search);
        setAnnonces(data);
      } catch (err) {
        console.error("Erreur chargement annonces :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonces();
  }, [search]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <>
      <Link
        className="font-bold hover:text-purple-500 hover:underline transition-all m-10"
        to="/"
      >
        Retour à l'accueil
      </Link>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {search ? `Résultats pour "${search}"` : "Toutes les annonces"}
        </h1>

        {annonces.length === 0 ? (
          <p className="text-gray-500">Aucune annonce trouvée.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {annonces.map((annonce) => (
              <div
                className="bg-neutral-primary-soft block max-w-sm border border-gray-300 rounded-2xl shadow-xs hover:shadow-lg transition-shadow duration-300"
                key={annonce.id}
              >
                <img
                  className="rounded-t-2xl"
                  src={annonce.image_url}
                  alt={annonce.name}
                />

                <div className="p-6 text-center">
                  <Link to={`/annonces/${annonce.id}`} key={annonce.id}>
                    <h5 className="mt-3 mb-2 text-2xl font-semibold tracking-tight text-heading">
                      {annonce.name}
                    </h5>
                  </Link>
                  <p className="mb-6 text-sm text-gray-500">
                    {annonce.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link to={`/annonces/${annonce.id}`} key={annonce.id}>
                      <Button text="Voir Plus ->" />
                    </Link>
                    <h3 className="text-xl font-bold text-gray-500">
                      {annonce.price} €
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Annonces;
