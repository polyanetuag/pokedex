import { useEffect, useState } from "react";
import { CardItem } from "./CardItem";
import "./CardList.css";
import { ItemDetails } from "./ItemDetails";

export function CardList() {
  const [openDetails, setOpenDetails] = useState(false);
  const [cardList, setCardList] = useState([]);

  const pokemonData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const json = await response.json();
    const result = json.results;

    setCardList(result);
  };

  const handleItemClick = () => {
    console.log("Card item clicado:");
    setOpenDetails(!openDetails);
  };

  useEffect(() => {
    pokemonData();
  }, []);

  return (
    <section className="card-list-section">
      <div className="card-list" onClick={handleItemClick}>
        {cardList?.map(({ name, url }) => (
          <CardItem key={name} name={name} url={url} />
        ))}
      </div>

      {openDetails && <ItemDetails />}
    </section>
  );
}
