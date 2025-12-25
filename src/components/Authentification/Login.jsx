import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithJson } from "../api/authApi";
// Importation des icônes pour le look professionnel
import { Mail, Lock, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token } = await loginWithJson(email, password);
      localStorage.setItem("authToken", token);
      navigate("/admin");
    } catch {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      {/* Arrière-plan décoratif discret */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-[420px] z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 space-y-6"
        >
          {/* Header avec Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 mb-2">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Bienvenue
            </h1>
            <p className="text-sm text-slate-500">
              Connectez-vous à votre interface de gestion
            </p>
          </div>

          <div className="space-y-4">
            {/* Champ Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider ml-1">
                Adresse email
              </label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yassmine@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-black border border-slate-200 rounded-xl text-sm
                           focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600
                           transition-all duration-200 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Champ Mot de Passe */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Mot de passe
                </label>
              </div>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-black border border-slate-200 rounded-xl text-sm
                           focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600
                           transition-all duration-200 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Erreur avec icône */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl animate-in fade-in duration-300">
              <AlertCircle size={16} />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Bouton Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm
                     hover:bg-indigo-700 active:scale-[0.99]
                     transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                     shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Identification...</span>
              </>
            ) : (
              "Se connecter"
            )}
          </button>

          {/* Footer discret */}
          <div className="pt-4 text-center border-t border-slate-50">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em]">
              © 2025 • Yassmine Ketata • Sécurité Admin
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
