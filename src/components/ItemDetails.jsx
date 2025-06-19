import { useEffect, useState } from "react";
import "./ItemDetails.css";

import { Link, useParams } from "react-router";
import { ArrowBack } from "../icons/ArrowBack";
import { theme } from "../theme";
import { Weight } from "../icons/Weight";
import { Height } from "../icons/Height";

export function ItemDetails() {
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecie, setPokemonSpecie] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const pokemonDetailsData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`
      );

      const json = await response.json();

      setPokemon(json);
    };
    pokemonDetailsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pokemonSpecieData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${params.id}`
      );

      const json = await response.json();

      setPokemonSpecie(json);
    };
    pokemonSpecieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstType = pokemon?.types?.[0].type?.name;
  const backgroundDinamic = theme.type[firstType];
  const typeNames = pokemon?.types?.map((item) => item.type.name);
  const abilities = pokemon?.abilities?.map((ability) => ability?.ability.name);
  // aqui o array foi transformado de objeto para string
  const stats = pokemon?.stats?.map((obj) => (
    <div
      style={{
        display: "flex",
        textTransform: "uppercase",
        gap: "20px",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <p
        style={{
          color: backgroundDinamic,
          fontWeight: "bold",
        }}
      >
        {obj?.stat.name}
      </p>
      <p>{obj?.base_stat}</p>
      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{ width: obj?.base_stat, background: backgroundDinamic }}
        />
      </div>
    </div>
  ));

  const species = pokemonSpecie?.flavor_text_entries[10];

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
              <div style={{ display: "flex", gap: 10 }}>
                <Height />
                {pokemonParaMetros} m
              </div>
              <div
                style={{
                  display: "flex",
                  // gap: 10,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {abilities?.map((name) => (
                  <span
                    style={{
                      // background: theme.type[name],

                      color: "black",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="about-item-text">
              <p>Weight</p>
              <p>Height</p>
              <p>Moves</p>
            </div>
          </section>

          <div className="about-description">
            <span>{species?.flavor_text}</span>
          </div>
          <section
            style={{
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  color: backgroundDinamic,
                  fontSize: "14px",
                }}
              >
                Base Stats
              </h1>
            </div>
            <div className="stats-container">
              <div className="stats-info">{stats}</div>
            </div>
          </section>
        </div>
      </div>
    )
  );
}
