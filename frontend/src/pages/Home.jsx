import { useEffect, useState } from "react";
import { getAllAnnonces } from "../services/annonces.service";
import Card from "../components/ui/Cards";

function Home() {
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
     useEffect(() => {
       const fetchAnnonces = async () => {
         try {
           const annonces = await getAllAnnonces();
           setAnnonces(annonces);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };

       fetchAnnonces();
     }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">Erreur: {error}</div>;

    return (
        <>
        <div className="bg-gray-900 px-8 py-32 flex flex-col items-center justify-center gap-6 mb-10">
        <p className=" text-gray-400 text-sm uppercase">
          Plateforme de petites annonces pour les passionnés de technologie
        </p>
        <h1 className="cursor-default text-8xl text-white text-center">
          le <span className="hover:text-blue-600 transition-all duration-500">CoinCoin</span>
        </h1>
        <h2 className=" text-2xl text-gray-300 text-center max-w-xl">
          Les petites annonces , pour les fans de technologie
        </h2>
        <div className="flex gap-4 mt-4">
          <button className="border border-gray-500 hover:border-white hover:translate-y-1 text-gray-300 hover:text-white px-8 py-3 rounded-full transition-all duration-200">
            (future) Voir les categories
          </button>
        </div>
      </div>
        <Card annonces={annonces} /></>
    )
}

export default Home;