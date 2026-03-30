import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff } from "lucide-react";
import edmBanner from "@/assets/edm-banner.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor preencha todos os campos.");
      return;
    }
    // Simulated login
    localStorage.setItem("peoplehub_auth", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={edmBanner} alt="Electricidade de Moçambique" className="w-full h-full object-cover" width={1920} height={512} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">PeopleHub</h2>
              <p className="text-white/60 text-sm">Electricidade de Moçambique</p>
            </div>
          </div>
          <p className="text-white/80 text-lg font-heading max-w-md leading-relaxed">
            Plataforma integrada de gestão de Recursos Humanos da EDM
          </p>
          <p className="text-white/50 text-sm mt-3">
            Aceda ao Dashboard, Plano de Férias, Avaliações de Desempenho e Portal de RH.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-secondary-foreground" />
            </div>
            <h1 className="font-heading text-lg font-bold text-foreground">PeopleHub</h1>
          </div>

          <h1 className="text-2xl font-heading font-bold text-foreground">Iniciar Sessão</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Introduza as suas credenciais para aceder à plataforma.
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email institucional</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="nome@edm.co.mz"
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Palavra-passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary" />
                Lembrar sessão
              </label>
              <button type="button" className="text-sm text-primary font-medium hover:underline">
                Esqueceu a palavra-passe?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Entrar
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-8 text-center">
            Páginas públicas como <strong>Colaboradores</strong> e <strong>Intranet</strong> não requerem autenticação.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
