import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe({ addRecipe, user }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    cuisine: "Indian",
    diet: "Vegetarian",
    time: "",
    image: "",
    description: "",
    ingredients: "",
    steps: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const recipe = {
      ...form,
      id: Date.now().toString(),
      createdBy: user?.email || "Guest",
      image: form.image ||
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=700",
      ingredients: form.ingredients.split(",").map(x => x.trim()).filter(Boolean),
      steps: form.steps.split("\n").map(x => x.trim()).filter(Boolean)
    };

    if (!recipe.ingredients.length || !recipe.steps.length) {
      alert("Enter ingredients and steps.");
      return;
    }

    addRecipe(recipe);
    alert("Recipe added successfully!");
    navigate("/");
  }

  return (
    <main className="container page">
      <div className="form-box">
        <h1>➕ Add New Recipe</h1>

        <form onSubmit={handleSubmit}>
          <label>Recipe Name</label>
          <input name="title" value={form.title}
            onChange={handleChange} required />

          <label>Cuisine</label>
          <select name="cuisine" value={form.cuisine}
            onChange={handleChange}>
            <option>Indian</option>
            <option>Italian</option>
            <option>Chinese</option>
            <option>American</option>
          </select>

          <label>Dietary Preference</label>
          <select name="diet" value={form.diet}
            onChange={handleChange}>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Non-Vegetarian</option>
          </select>

          <label>Preparation Time</label>
          <input name="time" value={form.time}
            onChange={handleChange} placeholder="30 min" required />


          <label>Ingredients (comma separated)</label>
          <textarea name="ingredients" value={form.ingredients}
            onChange={handleChange} required />

          <label>Preparation Steps (one per line)</label>
          <textarea name="steps" value={form.steps}
            onChange={handleChange} required />

          <button className="submit-btn" type="submit">
            Publish Recipe
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddRecipe;