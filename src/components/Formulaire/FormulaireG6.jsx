import React, { useState } from "react";
import {
  User,
  Mail as MailIcon,
  MessageSquare,
  CheckCircle2,
  Send,
  AlertCircle,
  MapPin,
  Phone,
} from "lucide-react";
import { sendEmail } from "../../Services/emailservice";
import { createFormSubmission } from "../api/formSubmissionsApi";

const ContactForm = () => {
  const [formValid, setFormValid] = useState({
    nom: false,
    email: false,
    message: false,
    priorité: true,
    send: false,
    sended: false,
    sending: false,
  });

  const errorMessage = {
    nom: "Le nom doit contenir au moins 3 caractères",
    email: "Merci d'entrer un email valide",
    message: "Le message doit contenir au moins 10 caractères",
  };

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
    priorité: "moyenne",
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false,
  });

  const verificationFormulaire = () => {
    const newValidState = {
      nom: formData.nom.length > 3,
      email: formData.email.includes("@") && formData.email.includes("."),
      message: formData.message.length > 10,
      priorité: true,
    };

    const allValid =
      newValidState.nom && newValidState.email && newValidState.message;

    setFormValid({
      ...formValid,
      ...newValidState,
      send: allValid,
    });

    return allValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (touched[e.target.name]) {
      setTimeout(() => verificationFormulaire(), 100);
    }
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    verificationFormulaire();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationFormulaire()) {
      return;
    }
    await createFormSubmission({
      ...formData,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    setFormValid({ ...formValid, sending: true });

    try {
      const result = await sendEmail(formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormValid({ ...formValid, sended: true, sending: false });

      setFormData({
        nom: "",
        email: "",
        message: "",
        priorité: "moyenne",
      });

      setTouched({
        nom: false,
        email: false,
        message: false,
      });

      setTimeout(() => {
        setFormValid({
          nom: false,
          email: false,
          message: false,
          priorité: true,
          send: false,
          sended: false,
          sending: false,
        });
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setFormValid({ ...formValid, sending: false });
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-24 pt-32"
    >
      {/* Effets lumineux */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {formValid.sended && (
          <div className="mb-8 bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl shadow-2xl animate-fade-in backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-3xl text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-1">
                  Message envoyé avec succès !
                </h3>
                <p className="text-gray-400">
                  Merci pour votre message, je vous répondrai dès que possible.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-gray-700/50 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/50">
              <MailIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Contactez-moi
            </h2>
            <p className="text-gray-400 text-lg font-medium">
              Une question ? Un projet ? N'hésitez pas à m'écrire.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Nom */}
            <div>
              <label
                htmlFor="nom"
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2"
              >
                <User className="w-4 h-4 text-purple-400" />
                Nom et Prénom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                onBlur={() => handleBlur("nom")}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-900/50 text-gray-200 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  touched.nom
                    ? formValid.nom
                      ? "border-purple-500 focus:ring-purple-500/50"
                      : "border-red-500 focus:ring-red-500/50"
                    : "border-gray-700 focus:border-purple-500 focus:ring-purple-500/50"
                }`}
                placeholder="Entrez votre nom complet"
                required
              />
              {touched.nom && !formValid.nom && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage.nom}</span>
                </div>
              )}
              {touched.nom && formValid.nom && (
                <div className="flex items-center gap-2 mt-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nom valide ✓</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2"
              >
                <MailIcon className="w-4 h-4 text-purple-400" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-900/50 text-gray-200 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  touched.email
                    ? formValid.email
                      ? "border-purple-500 focus:ring-purple-500/50"
                      : "border-red-500 focus:ring-red-500/50"
                    : "border-gray-700 focus:border-purple-500 focus:ring-purple-500/50"
                }`}
                placeholder="votre.email@exemple.com"
                required
              />
              {touched.email && !formValid.email && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage.email}</span>
                </div>
              )}
              {touched.email && formValid.email && (
                <div className="flex items-center gap-2 mt-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Email valide ✓</span>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                rows="6"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-900/50 text-gray-200 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                  touched.message
                    ? formValid.message
                      ? "border-purple-500 focus:ring-purple-500/50"
                      : "border-red-500 focus:ring-red-500/50"
                    : "border-gray-700 focus:border-purple-500 focus:ring-purple-500/50"
                }`}
                placeholder="Écrivez votre message ici..."
                required
              />
              {touched.message && !formValid.message && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage.message}</span>
                </div>
              )}
              {touched.message && formValid.message && (
                <div className="flex items-center gap-2 mt-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message valide ✓</span>
                </div>
              )}
            </div>

            {/* Priorité */}
            <div>
              <label
                htmlFor="priorité"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Priorité du message
              </label>
              <select
                name="priorité"
                id="priorité"
                onChange={handleChange}
                value={formData.priorité}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-900/50 text-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <option value="haute">🔴 Haute - Urgent</option>
                <option value="moyenne">🟡 Moyenne - Normal</option>
                <option value="basse">🟢 Basse - Non urgent</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!formValid.send || formValid.sending}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                formValid.send && !formValid.sending
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              {formValid.sending ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Envoyer le message</span>
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 font-medium">
              🔒 Vos données ne seront jamais partagées.
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center mb-4">
              <MailIcon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-200 mb-1">Email</h3>
            <p className="text-gray-400 font-medium text-sm">
              besbesmaryouma66@gmail.com
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:border-pink-500/50 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="font-bold text-gray-200 mb-1">Téléphone</h3>
            <p className="text-gray-400 font-medium text-sm">+216 95 575 561</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-bold text-gray-200 mb-1">Localisation</h3>
            <p className="text-gray-400 font-medium text-sm">Sfax, Tunisie</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
