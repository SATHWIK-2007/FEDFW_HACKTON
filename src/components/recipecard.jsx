import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, saved, toggleSave }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />

      <div className="card-content">
        <div className="card-top">
          <span className="tag">{recipe.cuisine}</span>

          <button
            className="heart"
            onClick={() => toggleSave(recipe.id)}
          >
            {saved.includes(recipe.id) ? "❤️" : "🤍"}
          </button>
        </div>

        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>

        <p> {recipe.diet}</p>
        <p> {recipe.time}</p>

        <Link
          to={`/recipe/${recipe.id}`}
          className="view-btn"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;