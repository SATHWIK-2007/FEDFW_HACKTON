import React from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetails({ recipes, saved, toggleSave, ratings, rateRecipe }) {
  const { id } = useParams();
  const recipe = recipes.find(item => item.id === id);

  if (!recipe) {
    return <main className="container page">
      <h1>Recipe Not Found</h1>
      <Link to="/">Go Home</Link>
    </main>;
  }

  return (
    <main className="container page">
      <div className="detail-box">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="detail-image"
        />

        <div className="detail-content">
          <span className="tag">{recipe.cuisine}</span>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <p>🥗 {recipe.diet} | ⏱ {recipe.time}</p>

          <button
            className="submit-btn"
            onClick={() => toggleSave(id)}
          >
            {saved.includes(id) ? "❤️ Remove Saved" : "🤍 Save Recipe"}
          </button>

          <h2>Rate This Recipe</h2>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                className={n <= (ratings[id] || 0) ? "selected" : ""}
                onClick={() => rateRecipe(id, n)}
              >
                ★
              </button>
            ))}
          </div>

          <p>Your rating: {ratings[id] || 0}/5</p>

          <h2>🥕 Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item, i) =>
              <li key={i}>{item}</li>
            )}
          </ul>

          <h2>👨‍🍳 Preparation Steps</h2>
          <ol>
            {recipe.steps.map((step, i) =>
              <li key={i}>{step}</li>
            )}
          </ol>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetails;