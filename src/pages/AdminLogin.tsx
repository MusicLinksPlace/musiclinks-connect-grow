import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) navigate("/stats", { replace: true });
    });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      navigate("/stats", { replace: true });
    } catch (err: any) {
      toast({
        title: "Login impossible",
        description: err?.message ?? "Vérifie tes identifiants.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.14),transparent_40%),linear-gradient(to_bottom,#0b0c10,#0b0c10)] text-white">
      <div className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-10">
        <div className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-sm text-white/70 hover:text-white hover:underline">
              Retour au site
            </Link>
            <div className="text-xs text-white/50">Admin</div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Connexion</h1>
            <p className="text-sm text-white/70">
              Accès à la page stats (lecture des inscriptions).
            </p>
          </div>

          <Card className="border-white/10 bg-white/5 p-5 backdrop-blur">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@musiclinks.app"
                  className="bg-white/5 text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Mot de passe</label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••••"
                  className="bg-white/5 text-white placeholder:text-white/40"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600"
              >
                <LogIn className="mr-2 h-4 w-4" />
                {loading ? "Connexion…" : "Se connecter"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

