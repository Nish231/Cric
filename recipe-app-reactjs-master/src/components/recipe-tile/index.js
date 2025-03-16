import React from "react";
import "./style.css"; 

function RecipeTile({ recipe, addToFavorites }) {
  return (
    <div className="recipeTile">
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        <img src={recipe.image} alt={recipe.label} className="recipeImage" />
      </a>
      <h2>
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
          {recipe.label}
        </a>
      </h2>
      <button className="view-more" onClick={() => window.open(recipe.url, "_blank")}>
        View More
      </button>
      <button className="fav-button" onClick={() => addToFavorites(recipe)}>
        ❤️ Add to Favorites
      </button>
    </div>
  );
}

export default RecipeTile;
