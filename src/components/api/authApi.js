// src/api/authApi.js
import axiosClient from "./axios";

// Auth simple basée sur json-server
export async function loginWithJson(email, password) {
  try {
    // json-server retourne un tableau filtré :
    const res = await axiosClient.get("/users", {
      params: { email, password },
    });

    const users = res.data;
    if (!users || users.length === 0) {
      // Pas d'utilisateur trouvé
      throw new Error("Email ou mot de passe invalide");
    }

    const user = users[0];

    // Génération d'un faux token pour mock auth
    const fakeToken = `user-${user.id}-${Date.now()}`;

    return {
      token: fakeToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (err) {
    throw new Error(err.message || "Erreur de connexion");
  }
}
