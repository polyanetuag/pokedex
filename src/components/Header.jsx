import { useState } from "react";
import { HashIcon } from "../icons/HashTag";
import { SearchIcon } from "../icons/Search";
import "./Header.css";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <img
          className="header-logo"
          src="src/assets/pokeball.svg"
          alt="Logo pokeball"
        />
        <h2 className="header-title">Pokédex</h2>
      </div>

      <div className="header-search">
        <input
          className="header-search-input"
          type="text"
          placeholder="Search"
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
                    checked
                  />
                  <label
                    className="dropdown-items-label"
                    htmlFor="input-number"
                  >
                    Number
                  </label>
                </div>
                <div className="dropdown-items">
                  <input className="dropdown-items-input" type="radio" />
                  <label className="dropdown-items-label" htmlFor="input-name">
                    Name
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
