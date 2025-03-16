import Axios from "axios";
import { useState, useEffect } from "react";
import "./app.css";
import RecipeTile from "./components/RecipeTile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const YOUR_APP_ID = "82e453da";
  const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const getRecipeInfo = async () => {
    if (!query.trim()) {
      setError("Please enter an ingredient.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await Axios.get(url);
      if (result.data.hits.length === 0) {
        setError("No recipes found. Try a different ingredient!");
      }
      setRecipes(result.data.hits);
    } catch (err) {
      setError("Error fetching recipes. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  // Toggle Light/Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* Home Page Button */}
      <button className="home-btn" onClick={() => window.location.reload()}>
        <FontAwesomeIcon icon={faHome} /> Home
      </button>

      {/* Light/Dark Mode Toggle */}
      <button className="theme-toggle" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>

      <h1 onClick={getRecipeInfo}>N-Spice Hub 🌶️🥘</h1>

      {/* Search Bar */}
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter ingredient..."
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading recipes...</p>}

      {/* Recipes Grid */}
      <div className="app__recipes">
        {recipes.length > 0 &&
          recipes.map((recipe, index) => (
            <RecipeTile key={index} recipe={recipe.recipe} />
          ))}
      </div>
    </div>
  );
}

export default App;
