import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Rocket, Mail, Instagram, Facebook, Twitter, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const scrollToForm = () => {
    document.getElementById('pre-inscription')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (data: any) => {
    try {
      const { error } = await (supabase as any)
        .from('pre_registrations')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          profile_type: data.profileType,
          specialty: data.specialty,
          message: data.message
        });

      if (error) throw error;

      setIsSubmitted(true);
      reset();
      toast({
        title: "Inscription réussie !",
        description: "Nous prendrons contact avec vous prochainement.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/10 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/favicon.png" alt="MusicLinks" className="w-6 h-6" />
            <span className="text-lg font-medium text-foreground">MusicLinks</span>
          </div>
          <Button 
            onClick={scrollToForm} 
            variant="ghost"
            size="sm"
            className="text-sm hover:bg-primary/5"
          >
            Se pré-inscrire
          </Button>
        </div>
      </header>

      {/* Section Hero */}
      <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-muted/20">
        <div className="text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1 mb-4 text-xs text-muted-foreground/70 bg-muted/30 px-3 py-1 rounded-full">
            <span>●</span>
            <span>Plateforme musicale nouvelle génération</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground mb-6 leading-tight tracking-tight">
            La plateforme qui connecte<br />
            <span className="font-light text-primary">artistes et professionnels</span><br />
            du secteur musical
          </h1>
          
          <p className="text-base text-muted-foreground mb-8 max-w-lg mx-auto font-light">
            Développez votre réseau professionnel et boostez votre carrière musicale
          </p>
          
          <Button 
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-sm font-medium rounded-md transition-all duration-200"
          >
            Rejoindre la communauté
          </Button>
        </div>
      </section>

      {/* Section Vidéo */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-light mb-2 text-foreground">Découvrez MusicLinks</h2>
            <p className="text-sm text-muted-foreground">
              En quelques minutes
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden border border-border/20 bg-muted/10">
              <video 
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src="/teaser.mp4" type="video/mp4" />
                <p className="p-4 text-center text-muted-foreground text-sm">
                  Votre navigateur ne supporte pas la lecture vidéo.
                </p>
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section Formulaire */}
      <section id="pre-inscription" className="py-12 bg-muted/5">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-light mb-2 text-foreground">
                    Pré-inscription
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Soyez parmi les premiers informés
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Input 
                        {...register("firstName", { required: "Requis" })}
                        placeholder="Prénom *" 
                        className="h-9 text-sm border-border/50 focus:border-primary"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName.message as string}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Input 
                        {...register("lastName", { required: "Requis" })}
                        placeholder="Nom *" 
                        className="h-9 text-sm border-border/50 focus:border-primary"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName.message as string}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Input 
                      {...register("email", { 
                        required: "Requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email invalide"
                        }
                      })}
                      type="email" 
                      placeholder="Email *" 
                      className="h-9 text-sm border-border/50 focus:border-primary"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Select onValueChange={(value) => register("profileType").onChange({ target: { value } })}>
                      <SelectTrigger className="h-9 text-sm border-border/50 focus:border-primary">
                        <SelectValue placeholder="Type de profil *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artiste">Artiste</SelectItem>
                        <SelectItem value="prestataire">Prestataire</SelectItem>
                        <SelectItem value="partenaire">Partenaire</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("profileType", { required: "Requis" })} />
                    {errors.profileType && (
                      <p className="text-xs text-destructive">{errors.profileType.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Input 
                      {...register("specialty")}
                      placeholder="Spécialité (optionnel)" 
                      className="h-9 text-sm border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <Textarea 
                      {...register("message")}
                      placeholder="Message (optionnel)" 
                      className="text-sm border-border/50 focus:border-primary min-h-[60px] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all duration-200"
                  >
                    {isSubmitting ? "..." : "Se pré-inscrire"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">Merci !</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Votre pré-inscription a été enregistrée.
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Nous prendrons contact avec vous prochainement.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Nouvelle inscription
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-light mb-2 text-foreground">
              Pourquoi MusicLinks ?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/5 rounded-lg mx-auto mb-3">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium mb-2 text-foreground">Visibilité</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gagnez en visibilité auprès des professionnels
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/5 rounded-lg mx-auto mb-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium mb-2 text-foreground">Connexions</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Trouvez les bons profils facilement
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/5 rounded-lg mx-auto mb-3">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium mb-2 text-foreground">Carrière</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Développez votre activité musicale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/10 py-8 bg-muted/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <img src="/favicon.png" alt="MusicLinks" className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">MusicLinks</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Révolutionnons les connexions musicales
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Contact</h4>
              <div className="flex items-center justify-center md:justify-start text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                <Mail className="w-3 h-3 mr-1" />
                <a href="mailto:musiclinksplatform@gmail.com">musiclinksplatform@gmail.com</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Suivez-nous</h4>
              <div className="flex justify-center md:justify-start space-x-2">
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-primary/5">
                  <Instagram className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-primary/5">
                  <Facebook className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-primary/5">
                  <Twitter className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/10 mt-6 pt-4 text-center">
            <p className="text-xs text-muted-foreground">© MusicLinks 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;