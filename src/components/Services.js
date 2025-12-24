export const sendEmail = async (formData) => {
  try {
    const response = await fetch("https://formspree.io/f/mayvlzqk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Message envoyé avec succès ✅",
      };
    } else {
      return {
        success: false,
        message: data.error || "Erreur lors de l'envoi ❌",
      };
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    return {
      success: false,
      message: "Erreur réseau. Vérifiez votre connexion 🌐",
    };
  }
};
