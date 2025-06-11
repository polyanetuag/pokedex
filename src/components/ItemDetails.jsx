import { useEffect, useState } from "react";
import "./ItemDetails.css";

import { Link, useParams } from "react-router";
import { ArrowBack } from "../icons/ArrowBack";
import { theme } from "../theme";

export function ItemDetails() {
  const params = useParams();
  console.log("params", params);
  const [pokemon, setPokemon] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  const typeNames = pokemon?.types?.map((item) => item.type.name);

  console.log(
    "typeNames ::>",
    typeNames?.map((name) => name)
  );

  const firstType = pokemon?.types?.[0].type?.name;
  console.log("firstType", firstType);

  const backgroundDinamic = theme.type[firstType];

  return (
    pokemon && (
      <div className="item-container" style={{ background: backgroundDinamic }}>
        <div className="item-header">
          <Link to="/">
            <ArrowBack />
          </Link>
          <h1 className="item-title">{capitalizeFirstLetter(pokemon.name)}</h1>
          <h2>{`#${pokemon.id}`}</h2>

          <img
            className="item-background"
            src="/src/assets/pokeball2.svg"
            alt="pokeball"
          />
        </div>
        <div className="item-img">
          <img
            width="100%"
            src={pokemon.sprites?.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <div className="item-info">
          <div className="item-type">
            {typeNames?.map((name) => (
              <span
                style={{
                  background: theme.type[name],
                  padding: "2px 8px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                {name}
              </span>
            ))}
          </div>
          <div>
            <h1
              style={{
                color: backgroundDinamic,
                fontSize: "14px",
              }}
            >
              About
            </h1>
          </div>
          <section>
            <div>peso | height | moves</div>
            <p>description</p>
          </section>

          <section>
            <div>Base Stats</div>
            <p>ranges</p>
          </section>
        </div>
      </div>
    )
  );
}
