import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Copy, LogOut, Search, ShieldAlert } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

type EmailSignupRow = {
  id: string;
  email: string;
  created_at: string;
  source: string | null;
  metadata: Record<string, unknown> | null;
};

const PAGE_SIZE = 25;

function asString(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v : null;
}

function profileTag(profile: string) {
  const p = profile.toLowerCase();
  if (p === "artiste") {
    return { label: "artiste", className: "bg-indigo-50 text-indigo-700 border border-indigo-100" };
  }
  if (p === "prestataire") {
    return { label: "prestataire", className: "bg-emerald-50 text-emerald-700 border border-emerald-100" };
  }
  if (p === "partenaire") {
    return { label: "partenaire", className: "bg-amber-50 text-amber-700 border border-amber-100" };
  }
  return { label: profile, className: "bg-slate-50 text-slate-700 border border-slate-100" };
}

export default function Stats() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [profileType, setProfileType] = useState<"" | "artiste" | "prestataire" | "partenaire">("");
  const [page, setPage] = useState(1);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        navigate("/admin", { replace: true });
        return;
      }
      setAuthReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin", { replace: true });
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const normalizedQuery = query.trim();
  const range = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    return { from, to };
  }, [page]);

  const list = useQuery({
    queryKey: ["email_signups", { normalizedQuery, profileType, page }],
    queryFn: async () => {
      let q = (supabase as any)
        .from("email_signups")
        .select("id,email,created_at,source,metadata", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(range.from, range.to);

      if (normalizedQuery) {
        q = q.ilike("email", `%${normalizedQuery}%`);
      }

      if (profileType) {
        q = q.eq("metadata->>profile_type", profileType);
      }

      const { data, error, count } = await q;
      if (error) throw error;

      return {
        rows: (data ?? []) as EmailSignupRow[],
        count: (count ?? 0) as number,
      };
    },
    staleTime: 10_000,
    enabled: authReady,
  });

  const kpis = useQuery({
    queryKey: ["email_signups_kpis"],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - 7);

      const [total, last7d, latest] = await Promise.all([
        (supabase as any)
          .from("email_signups")
          .select("id", { count: "exact", head: true }),
        (supabase as any)
          .from("email_signups")
          .select("id", { count: "exact", head: true })
          .gte("created_at", since.toISOString()),
        (supabase as any)
          .from("email_signups")
          .select("created_at")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      if (total.error) throw total.error;
      if (last7d.error) throw last7d.error;
      if (latest.error) throw latest.error;

      return {
        total: (total.count ?? 0) as number,
        last7d: (last7d.count ?? 0) as number,
        latestAt: (latest.data?.created_at as string | undefined) ?? null,
      };
    },
    staleTime: 30_000,
    enabled: authReady,
  });

  const totalPages = useMemo(() => {
    const total = list.data?.count ?? 0;
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  }, [list.data?.count]);

  const rows = list.data?.rows ?? [];

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const emptyState = !list.isLoading && rows.length === 0;

  const headerSubtitle = useMemo(() => {
    const total = list.data?.count ?? 0;
    const shownFrom = rows.length ? range.from + 1 : 0;
    const shownTo = rows.length ? range.from + rows.length : 0;
    return total
      ? `Affichage ${shownFrom}–${shownTo} sur ${total}`
      : "Aucune donnée à afficher";
  }, [list.data?.count, range.from, rows.length]);

  return (
    <div className="h-screen overflow-hidden bg-[linear-gradient(to_bottom,#f7f8fb,transparent),radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.10),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.08),transparent_42%)]">
      <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-5">
        {/* Fixed top area */}
        <div className="shrink-0">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-white/80">
                    Admin
                  </Badge>
                  <Link to="/" className="text-sm text-muted-foreground hover:underline">
                    Retour au site
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-1"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate("/admin", { replace: true });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Stats — Liste d’attente
                </h1>
                <p className="text-sm text-muted-foreground">{headerSubtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <Card className="border-slate-200/70 bg-white/70 p-4 backdrop-blur">
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">
                    {kpis.data?.total ?? "—"}
                  </div>
                </Card>
                <Card className="border-slate-200/70 bg-white/70 p-4 backdrop-blur">
                  <div className="text-xs text-muted-foreground">7 derniers jours</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">
                    {kpis.data?.last7d ?? "—"}
                  </div>
                </Card>
                <Card className="hidden border-slate-200/70 bg-white/70 p-4 backdrop-blur md:block">
                  <div className="text-xs text-muted-foreground">Dernière inscription</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {kpis.data?.latestAt
                      ? formatDistanceToNowStrict(new Date(kpis.data.latestAt), { addSuffix: true })
                      : "—"}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Grid area: fixed header + scroll body + fixed footer */}
        <Card className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden border-slate-200/70 bg-white/70 backdrop-blur">
          <div className="shrink-0 border-b border-slate-200/60 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative w-full md:max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => {
                      setPage(1);
                      setQuery(e.target.value);
                    }}
                    placeholder="Rechercher un email…"
                    className="bg-white/60 pl-9"
                  />
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    type="button"
                    variant={profileType === "" ? "secondary" : "outline"}
                    onClick={() => {
                      setPage(1);
                      setProfileType("");
                    }}
                  >
                    Tous
                  </Button>
                  <Button
                    type="button"
                    variant={profileType === "artiste" ? "secondary" : "outline"}
                    onClick={() => {
                      setPage(1);
                      setProfileType("artiste");
                    }}
                  >
                    Artistes
                  </Button>
                  <Button
                    type="button"
                    variant={profileType === "prestataire" ? "secondary" : "outline"}
                    onClick={() => {
                      setPage(1);
                      setProfileType("prestataire");
                    }}
                  >
                    Prestataires
                  </Button>
                  <Button
                    type="button"
                    variant={profileType === "partenaire" ? "secondary" : "outline"}
                    onClick={() => {
                      setPage(1);
                      setProfileType("partenaire");
                    }}
                  >
                    Partenaires
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 md:justify-end">
                <div className="flex items-center gap-2 md:hidden">
                  <select
                    value={profileType}
                    onChange={(e) => {
                      setPage(1);
                      setProfileType(e.target.value as any);
                    }}
                    className="h-10 rounded-md border border-slate-200 bg-white/60 px-3 text-sm"
                  >
                    <option value="">Tous</option>
                    <option value="artiste">Artistes</option>
                    <option value="prestataire">Prestataires</option>
                    <option value="partenaire">Partenaires</option>
                  </select>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    list.refetch();
                    kpis.refetch();
                  }}
                  disabled={list.isFetching || kpis.isFetching}
                >
                  Actualiser
                </Button>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 p-2">
            <div className="h-full overflow-hidden rounded-xl border border-slate-200/70 bg-white/50">
              <Table className="[&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2">
                <TableHeader className="sticky top-0 z-10 bg-white/90 backdrop-blur">
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Profil</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Créé</TableHead>
                    <TableHead className="w-[80px]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {list.isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                        Chargement…
                      </TableCell>
                    </TableRow>
                  ) : list.isError ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-10">
                        <div className="mx-auto max-w-xl rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                          <div className="mb-1 flex items-center gap-2 font-medium">
                            <ShieldAlert className="h-4 w-4" />
                            Impossible de charger les données
                          </div>
                          <div className="text-rose-700/90">
                            {(list.error as any)?.message ?? "Erreur inconnue"}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : emptyState ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-14 text-center text-muted-foreground">
                        Aucun résultat. Essaie une recherche différente.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((r) => {
                      const meta = r.metadata ?? {};
                      const profile = asString((meta as any).profile_type);
                      const firstName = asString((meta as any).first_name);
                      const specialty = asString((meta as any).specialty);

                      return (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium text-slate-900">
                            {r.email}
                          </TableCell>
                          <TableCell>
                            {profile ? (
                              <span
                                className={[
                                  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                                  profileTag(profile).className,
                                ].join(" ")}
                              >
                                {profileTag(profile).label}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>{firstName ?? <span className="text-muted-foreground">—</span>}</TableCell>
                          <TableCell>{specialty ?? <span className="text-muted-foreground">—</span>}</TableCell>
                          <TableCell>{r.source ?? <span className="text-muted-foreground">—</span>}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="text-slate-900">
                              {format(new Date(r.created_at), "dd/MM/yyyy")}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNowStrict(new Date(r.created_at), { addSuffix: true })}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(r.email);
                                  toast({ title: "Email copié", description: r.email });
                                } catch {
                                  toast({
                                    title: "Copie impossible",
                                    description: "Ton navigateur a bloqué l’accès au presse‑papier.",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-200/60 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-muted-foreground">
                Page <span className="font-medium text-slate-900">{page}</span> sur{" "}
                <span className="font-medium text-slate-900">{totalPages}</span>
              </div>
              <Pagination className="mx-0 justify-start md:justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (canPrev) setPage((p) => p - 1);
                      }}
                      className={!canPrev ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      onClick={(e) => e.preventDefault()}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (canNext) setPage((p) => p + 1);
                      }}
                      className={!canNext ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

