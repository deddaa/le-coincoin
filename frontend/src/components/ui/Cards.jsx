import { Link } from "react-router-dom";
import Button from "./Button";
function Card({ annonces = [] }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {annonces.map((annonce) =>(
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
            <p className="mb-6 text-sm text-gray-500">{annonce.description}</p>
            <div className="flex justify-between items-center">
            <Link to={`/annonces/${annonce.id}`} key={annonce.id}>
              <Button text="Voir Plus ->" />
            </Link>
            <h3 className="text-xl font-bold text-gray-500">{annonce.price} €</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;