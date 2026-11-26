import React from "react";

function AdminDashboard({ recipes, users, deleteRecipe, onLogout }) {
  return (
    <main className="container page">
      <div className="admin-heading">
        <div>
          <h1>⚙️ Admin Dashboard</h1>
          <p>Manage your Foodie Recipe App.</p>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout Admin
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{recipes.length}</h2>
          <p>Total Recipes</p>
        </div>

        <div className="stat-card">
          <h2>{users.length}</h2>
          <p>Registered Users</p>
        </div>
      </div>

      <h2>Recipe Management</h2>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Cuisine</th>
              <th>Diet</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.id}>
                <td>{recipe.title}</td>
                <td>{recipe.cuisine}</td>
                <td>{recipe.diet}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm("Delete this recipe?")) {
                        deleteRecipe(recipe.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recipes.length === 0 && <p>No recipes available.</p>}
      </div>
    </main>
  );
}

export default AdminDashboard;