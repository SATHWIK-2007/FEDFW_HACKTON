import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import RecipeDetails from "./pages/recipedetails";
import SavedRecipes from "./pages/savedrecipe";
import AddRecipe from "./pages/addrecipe";

import AdminLogin from "./admin/adminlogin";
import AdminDashboard from "./admin/admindashboard";

import "./index.css";

// Default recipes
const defaultRecipes = [
  {
    id: "1",
    title: "Paneer Butter Masala",
    cuisine: "Indian",
    diet: "Vegetarian",
    time: "35 min",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700",
    description: "Creamy and delicious Indian paneer curry.",
    ingredients: ["Paneer", "Tomato", "Butter", "Cream", "Spices"],
    steps: ["Heat butter.", "Add tomato puree and spices.", "Add paneer.", "Add cream and cook."]
  },
  {
    id: "2",
    title: "Margherita Pizza",
    cuisine: "Italian",
    diet: "Vegetarian",
    time: "30 min",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700",
    description: "Classic Italian cheese pizza.",
    ingredients: ["Pizza base", "Cheese", "Tomato", "Basil"],
    steps: ["Prepare pizza base.", "Spread sauce.", "Add cheese.", "Bake until ready."]
  },
  {
    id: "3",
    title: "Vegetable Fried Rice",
    cuisine: "Chinese",
    diet: "Vegan",
    time: "20 min",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700",
    description: "Delicious vegetable fried rice.",
    ingredients: ["Rice", "Carrot", "Beans", "Onion", "Soy sauce"],
    steps: ["Cook rice.", "Chop vegetables.", "Fry vegetables.", "Add rice and soy sauce."]
  },
  {
    id: "4",
    title: "Chocolate Cake",
    cuisine: "American",
    diet: "Vegetarian",
    time: "50 min",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
    description: "Rich and delicious chocolate cake.",
    ingredients: ["Flour", "Cocoa", "Sugar", "Milk", "Butter"],
    steps: ["Mix ingredients.", "Prepare batter.", "Pour into cake pan.", "Bake until ready."]
  },
  {
     id: "5",
  title: "Chicken Biryani",
  cuisine: "Indian",
  diet: "Non-Vegetarian",
  time: "60 min",
  image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=700",
  description: "Traditional aromatic chicken biryani.",
  ingredients: ["Chicken", "Rice", "Onion", "Yogurt", "Spices"],
  steps: [
    "Marinate chicken.",
    "Prepare rice.",
    "Cook chicken masala.",
    "Layer and finish cooking."
  ]
  },
  {
    id: "6",
    title: "Fruit Salad",
    cuisine: "International",
    diet: "Vegan",
    time: "10 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
    description: "Fresh and healthy fruit salad.",
    ingredients: ["Apple", "Banana", "Grapes", "Orange"],
    steps: ["Wash fruits.", "Cut fruits.", "Mix together.", "Serve fresh."]
  }
];

// Read Local Storage safely
function getStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [recipes, setRecipes] = useState(
    () => getStorage("foodieRecipes", defaultRecipes)
  );

  const [saved, setSaved] = useState(
    () => getStorage("foodieSaved", [])
  );

  const [ratings, setRatings] = useState(
    () => getStorage("foodieRatings", {})
  );

  const [users, setUsers] = useState(
    () => getStorage("foodieUsers", [])
  );

  const [currentUser, setCurrentUser] = useState(
    () => getStorage("foodieCurrentUser", null)
  );

  const [isAdmin, setIsAdmin] = useState(
    () => getStorage("foodieAdmin", false)
  );

  // Save application data
  useEffect(() => {
    localStorage.setItem("foodieRecipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("foodieSaved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("foodieRatings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("foodieUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "foodieCurrentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("foodieCurrentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("foodieAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  // User registration
  function signup(user) {
    setUsers(old => [...old, user]);
  }

  // User login
  function login(user) {
    setCurrentUser(user);
  }

  // User logout
  function logout() {
    setCurrentUser(null);
  }

  // Save or remove favorite
  function toggleSave(id) {
    setSaved(old =>
      old.includes(id)
        ? old.filter(item => item !== id)
        : [...old, id]
    );
  }

  // Add recipe
  function addRecipe(recipe) {
    setRecipes(old => [recipe, ...old]);
  }

  // Delete recipe
  function deleteRecipe(id) {
    setRecipes(old => old.filter(recipe => recipe.id !== id));
    setSaved(old => old.filter(item => item !== id));

    setRatings(old => {
      const updated = { ...old };
      delete updated[id];
      return updated;
    });
  }

  // Recipe rating
  function rateRecipe(id, rating) {
    setRatings(old => ({ ...old, [id]: rating }));
  }

  // Admin logout
  function adminLogout() {
    setIsAdmin(false);
  }

  return (
    <BrowserRouter>
      <Navbar user={currentUser} onLogout={logout} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              recipes={recipes}
              saved={saved}
              toggleSave={toggleSave}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login users={users} onLogin={login} />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup users={users} onSignup={signup} />
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              recipes={recipes}
              saved={saved}
              toggleSave={toggleSave}
              ratings={ratings}
              rateRecipe={rateRecipe}
            />
          }
        />

        <Route
          path="/saved"
          element={
            <SavedRecipes
              recipes={recipes}
              saved={saved}
              toggleSave={toggleSave}
            />
          }
        />

        <Route
          path="/add"
          element={
            currentUser
              ? <AddRecipe addRecipe={addRecipe} user={currentUser} />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admin"
          element={
            isAdmin
              ? <Navigate to="/admin/dashboard" replace />
              : <AdminLogin onAdminLogin={setIsAdmin} />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            isAdmin
              ? (
                <AdminDashboard
                  recipes={recipes}
                  users={users}
                  deleteRecipe={deleteRecipe}
                  onLogout={adminLogout}
                />
              )
              : <Navigate to="/admin" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;