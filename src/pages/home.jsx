import React, { useState } from "react";
import RecipeCard from "../components/recipecard";

function Home({ recipes, saved, toggleSave }) {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");

  const filteredRecipes = recipes.filter(recipe => {
    const matchSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some(item =>
        item.toLowerCase().includes(search.toLowerCase())
      );

    return matchSearch &&
      (cuisine === "All" || recipe.cuisine === cuisine) &&
      (diet === "All" || recipe.diet === diet);
  });

  return (
    <>
      <section className="hero">
        <div>
          <span>WELCOME TO FOODIE</span>
          <h1>Discover Delicious<br />Recipes Every Day!</h1>
          <p>Explore new cuisines and enjoy delicious recipes.</p>
          <a href="#recipes" className="hero-btn">
            Explore Recipes
          </a>
        </div>
      </section>

      <main className="container" id="recipes">
        <h2>Explore Recipes</h2>
        <p>Find your favorite dishes.</p>

        <div className="filters">
          <input
            placeholder="Search recipes or ingredients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={cuisine}
            onChange={e => setCuisine(e.target.value)}>
            <option value="All">All Cuisines</option>
            <option>Indian</option>
            <option>Italian</option>
            <option>Chinese</option>
            <option>American</option>
          </select>

          <select value={diet}
            onChange={e => setDiet(e.target.value)}>
            <option value="All">All Diets</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Non-Vegetarian</option>
          </select>
        </div>

        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              saved={saved}
              toggleSave={toggleSave}
            />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <p className="empty">No recipes found!</p>
        )}
      </main>
    </>
  );
}

export default Home;