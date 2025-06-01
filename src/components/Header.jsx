import "./Header.css";

export function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <img
          className="header-logo"
          src="src/assets/pokeball.svg"
          alt="Logo pokeball"
        />
        <h2 className="header-title">Pokedex</h2>
      </div>
    </header>
  );
}
