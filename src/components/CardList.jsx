import { useEffect, useMemo, useState } from "react";
import { CardItem } from "./CardItem";
import "./CardList.css";
import { ItemDetails } from "./ItemDetails";
import { HashIcon } from "../icons/HashTag";

export function CardList() {
  const [openDetails, setOpenDetails] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [sort, setSort] = useState("number");

  const pokemonData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
    const json = await response.json();
    const result = json.results;

    setCardList(result);
  };

  const handleItemClick = () => {
    setOpenDetails(!openDetails);
  };

  const handleClick = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  console.log("sort ::>", sort);

  const sortedList = useMemo(() => {
    if (sort === "number") {
      return cardList;
    }

    const sortedList = [...cardList];

    return sortedList?.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }, [sort, cardList]);

  useEffect(() => {
    pokemonData();
  }, []);

  return (
    <>
      <div className="header-search">
        <input
          className="header-search-input"
          type="text"
          placeholder="Search"
          disabled
        />

        <div className="dropdown">
          <button className="drowpdown-trigger" onClick={handleClick}>
            <HashIcon />
          </button>
          {openMenu && (
            <div className="dropdown-content">
              <p>Sort by:</p>
              <div className="dropdown-items-content">
                <div className="dropdown-items">
                  <input
                    className="dropdown-items-input"
                    type="radio"
                    checked={sort === "number"}
                    onChange={() => {
                      setSort("number");
                      setOpenMenu(false);
                    }}
                  />
                  <label
                    className="dropdown-items-label"
                    htmlFor="input-number"
                  >
                    Number
                  </label>
                </div>
                <div className="dropdown-items">
                  <input
                    className="dropdown-items-input"
                    type="radio"
                    onChange={() => {
                      setSort("name");
                      setOpenMenu(false);
                    }}
                    checked={sort === "name"}
                  />
                  <label className="dropdown-items-label" htmlFor="input-name">
                    Name
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <section className="card-list-section">
        <div className="card-list" onClick={handleItemClick}>
          {sortedList?.map(({ name, url }) => (
            <CardItem key={name} name={name} url={url} />
          ))}
        </div>

        {openDetails && <ItemDetails key={name} />}
      </section>
    </>
  );
}
