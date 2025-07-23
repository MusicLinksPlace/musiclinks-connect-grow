import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Rocket, Mail, Instagram, Facebook, Twitter, Music, ArrowDown, Play } from "lucide-react";
import heroMusicBg from "@/assets/hero-music-bg.jpg";

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('pre-inscription')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-lg p-2">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">MusicLinks</span>
          </div>
          <Button 
            onClick={scrollToForm} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            Se pré-inscrire
          </Button>
        </div>
      </header>

      {/* Section Hero */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroMusicBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60"></div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-8">
            <Music className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Plateforme musicale nouvelle génération</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            La plateforme qui connecte les 
            <span className="text-primary block">artistes aux meilleurs</span>
            prestataires et partenaires du secteur musical
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Rejoignez la révolution musicale et développez votre réseau professionnel
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Je me pré-inscris
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Découvrez MusicLinks en vidéo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plongez dans l'univers de la collaboration musicale
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative group cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full p-6 mb-4 inline-flex">
                      <Play className="w-12 h-12 text-primary-foreground ml-1" />
                    </div>
                    <p className="text-lg text-foreground font-medium">Vidéo de présentation</p>
                    <p className="text-muted-foreground">Bientôt disponible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Formulaire */}
      <section id="pre-inscription" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Rejoignez la communauté
              </h2>
              <p className="text-xl text-muted-foreground">
                Soyez parmi les premiers à accéder à MusicLinks
              </p>
            </div>
            
            <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-10">
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center">
                        Prénom
                        <span className="text-destructive ml-1">*</span>
                      </label>
                      <Input 
                        placeholder="Votre prénom" 
                        className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center">
                        Nom
                        <span className="text-destructive ml-1">*</span>
                      </label>
                      <Input 
                        placeholder="Votre nom" 
                        className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                      <span className="text-destructive ml-1">*</span>
                    </label>
                    <Input 
                      type="email" 
                      placeholder="votre@email.com" 
                      className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Type de profil
                      <span className="text-destructive ml-1">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent className="bg-background/95 backdrop-blur-sm">
                        <SelectItem value="artiste">🎤 Artiste</SelectItem>
                        <SelectItem value="prestataire">🎛️ Prestataire</SelectItem>
                        <SelectItem value="partenaire">🤝 Partenaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <Music className="w-4 h-4 mr-2" />
                      Spécialité / Genre musical
                    </label>
                    <Input 
                      placeholder="Ex: Rock, Jazz, Production, Management..." 
                      className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Message (optionnel)
                    </label>
                    <Textarea 
                      placeholder="Parlez-nous de votre projet..." 
                      className="bg-background/50 border-border/50 focus:border-primary transition-all duration-200 min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg"
                  >
                    Se pré-inscrire
                    <Rocket className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Pourquoi rejoindre MusicLinks ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez tous les avantages de notre plateforme
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Gagnez en visibilité</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mettez en avant votre talent et vos services auprès d'un réseau qualifié de professionnels
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Trouvez les bons profils</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connectez-vous avec des professionnels qui correspondent parfaitement à vos besoins
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Développez votre carrière</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Boostez votre carrière musicale ou votre activité dans le secteur
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border/50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary rounded-lg p-2">
                  <Music className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">MusicLinks</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                La plateforme qui révolutionne les connexions dans le secteur musical. 
                Rejoignez notre communauté et développez votre réseau professionnel.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-6">Contact</h4>
              <div className="flex items-center text-muted-foreground mb-3 hover:text-primary transition-colors duration-200">
                <Mail className="w-5 h-5 mr-3" />
                <a href="mailto:musiclinksplatform@gmail.com">musiclinksplatform@gmail.com</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-6">Suivez-nous</h4>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded-lg"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded-lg"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded-lg"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© MusicLinks 2025 - Tous droits réservés</p>
            <Button variant="link" className="text-muted-foreground hover:text-primary">
              Mentions légales
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
