import { Link } from "react-router";
import "./CardItem.css";
import { useEffect, useState } from "react";

export function CardItem({ name, url }) {
  const [pokemonCard, setPokemonCard] = useState([]);

  useEffect(() => {
    const pokemonDetailsData = async () => {
      const response = await fetch(url);
      const json = await response.json();

      setPokemonCard(json);
    };

    if (url) {
      pokemonDetailsData();
    }
  }, [url]);

  if (!pokemonCard) {
    return null;
  }

  return (
    <Link to={`/${pokemonCard.id}`} className="link">
      <div className="card-list-details">
        <span className="card-list-details-code">{`#${pokemonCard.id}`}</span>
        <div className="card-list-details-img">
          <div>
            <img
              width="100%"
              src={pokemonCard.sprites?.other["official-artwork"].front_default}
              alt=""
            />
          </div>
        </div>
        <span className="card-list-details-name">{name}</span>
        <div className="card-list-details-background"></div>
      </div>
    </Link>
  );
}
