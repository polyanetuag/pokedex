import { useEffect, useState } from "react";
import "./ItemDetails.css";

import { useParams } from "react-router";
import { ArrowBack } from "../icons/ArrowBack";

export function ItemDetails() {
  const params = useParams();
  console.log("params", params);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const pokemonDetailsData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`
      );

      const json = await response.json();
      console.log("json>>>>>>>>>>>", json);

      setPokemon(json);
    };
    pokemonDetailsData();
  }, []);

  return (
    pokemon && (
      <div className="item-container">
        <div className="item-header">
          <ArrowBack />
          <h1 className="item-title">{pokemon.name}</h1>
          <h2>{pokemon.id}</h2>
        </div>
        <div className="item-img">
          <img src={pokemon.sprites.front_default} alt="" />
        </div>
      </div>
    )
  );
}
