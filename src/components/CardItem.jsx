import "./CardItem.css";

export function CardItem() {
  return (
    <div className="card-list-details">
      <span className="card-list-details-code">#001</span>
      <div className="card-list-details-img">
        <div>
          <img
            width="100%"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            alt=""
          />
        </div>
      </div>
      <span className="card-list-details-name">Bulbasaur</span>
      <div className="card-list-details-background"></div>
    </div>
  );
}
