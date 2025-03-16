import React from "react";
import "./RecipeTile.css"; // Create a new CSS file for styling

function RecipeTile({ recipe }) {
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
    </div>
  );
}

export default RecipeTile;
