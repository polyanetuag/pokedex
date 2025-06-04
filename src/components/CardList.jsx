import { CardItem } from "./CardItem";
import "./CardList.css";

export function CardList() {
  return (
    <section className="card-list-section">
      <div className="card-list">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </section>
  );
}
