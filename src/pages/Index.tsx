import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Rocket, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('pre-inscription')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">MusicLinks</div>
          <Button onClick={scrollToForm} className="bg-primary hover:bg-primary/90">
            Se pré-inscrire
          </Button>
        </div>
      </header>

      {/* Section Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            La plateforme qui connecte les artistes aux meilleurs prestataires et partenaires du secteur musical
          </h1>
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
          >
            Je me pré-inscris
          </Button>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Découvrez MusicLinks</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-lg p-8 border">
              <p className="text-lg text-muted-foreground mb-4">
                Vidéo de présentation à venir...
              </p>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Vidéo de présentation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Formulaire */}
      <section id="pre-inscription" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Pré-inscrivez-vous dès maintenant
            </h2>
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Prénom *
                      </label>
                      <Input placeholder="Votre prénom" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nom *
                      </label>
                      <Input placeholder="Votre nom" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input type="email" placeholder="votre@email.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Type de profil *
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artiste">Artiste</SelectItem>
                        <SelectItem value="prestataire">Prestataire</SelectItem>
                        <SelectItem value="partenaire">Partenaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Spécialité / Genre musical
                    </label>
                    <Input placeholder="Ex: Rock, Jazz, Production, Management..." />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message (optionnel)
                    </label>
                    <Textarea placeholder="Parlez-nous de votre projet..." />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Se pré-inscrire
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Pourquoi rejoindre MusicLinks ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Gagnez en visibilité</h3>
              <p className="text-muted-foreground">
                Mettez en avant votre talent et vos services auprès d'un réseau qualifié
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Trouvez les bons profils</h3>
              <p className="text-muted-foreground">
                Connectez-vous avec des professionnels qui correspondent à vos besoins
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Développez votre carrière</h3>
              <p className="text-muted-foreground">
                Boostez votre carrière musicale ou votre activité dans le secteur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">MusicLinks</h3>
              <p className="text-muted-foreground">
                La plateforme qui connecte le secteur musical
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="flex items-center text-muted-foreground mb-2">
                <Mail className="w-4 h-4 mr-2" />
                musiclinksplatform@gmail.com
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© MusicLinks 2025 - Tous droits réservés</p>
            <div className="mt-2">
              <Button variant="link" className="text-muted-foreground">
                Mentions légales
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
