import { useEffect, useState } from "react";
import "./ItemDetails.css";

import { Link, useParams } from "react-router";
import { ArrowBack } from "../icons/ArrowBack";
import { theme } from "../theme";
import { Weight } from "../icons/Weight";
import { Height } from "../icons/Height";

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
  const abilities = pokemon?.abilities?.map((ability) => ability?.name);
  console.log("abilities", abilities);

  const firstType = pokemon?.types?.[0].type?.name;

  const backgroundDinamic = theme.type[firstType];

  const pokemonKg = pokemon?.weight / 10;

  const pokemonParaMetros = pokemon?.height / 10;

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
          <section className="container-about">
            <div className="about-items">
              <div style={{ display: "flex", gap: 10 }}>
                <Weight />
                {pokemonKg} kg
              </div>
              <p
                style={{
                  color: "#666666",
                }}
              >
                Weight
              </p>
            </div>
            <div className="about-items">
              <div style={{ display: "flex", gap: 10 }}>
                <Height />
                {pokemonParaMetros} m
              </div>
              <p
                style={{
                  color: "#666666",
                }}
              >
                Height
              </p>
            </div>
            <div className="about-items">
              <div style={{ display: "flex", gap: 10 }}></div>
              <p
                style={{
                  color: "#666666",
                }}
              >
                Moves
              </p>
            </div>

            <div> moves</div>
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
