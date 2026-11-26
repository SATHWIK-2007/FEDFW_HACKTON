import React from "react";
import RecipeCard from "../components/recipecard";

function SavedRecipes({ recipes, saved, toggleSave }) {
  const savedRecipes = recipes.filter(recipe =>
    saved.includes(recipe.id)
  );

  return (
    <main className="container page">
      <h1>❤️ Saved Recipes</h1>
      <p>Your favorite recipes.</p>

      <div className="recipe-grid">
        {savedRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            saved={saved}
            toggleSave={toggleSave}
          />
        ))}
      </div>

      {savedRecipes.length === 0 && (
        <p className="empty">No saved recipes yet!</p>
      )}
    </main>
  );
}

export default SavedRecipes;