import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Rocket, Mail, Instagram, Facebook, Twitter, CheckCircle, ArrowRight, Play, Star, Zap, Globe, Music, Crown } from "lucide-react";
import BlurText from "@/components/BlurText";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    document.getElementById('pre-inscription')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVideo = () => {
    document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
    // Auto-play video after scroll
    setTimeout(() => {
      if (videoRef) {
        videoRef.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    }, 1000);
  };

  const handleVideoClick = () => {
    if (videoRef) {
      try {
        if (videoRef.paused) {
          videoRef.play();
        } else {
          videoRef.pause();
        }
      } catch (error) {
        console.log('Video play/pause error:', error);
      }
    }
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src="/favIcon.png" alt="MusicLinks" className="w-8 h-8" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-sm opacity-50"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MusicLinks
            </span>
          </div>
          <Button 
            onClick={scrollToForm} 
            variant="ghost"
            size="sm"
            className="text-sm hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            Rejoindre la révolution
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-8 text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Plateforme musicale nouvelle génération</span>
            </div>
            
            <div className="mb-8 relative z-20 text-center">
              <h1 className="hero-title font-black leading-tight text-white">
                <BlurText
                  text="CONNECTEZ VOTRE PASSION"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className=""
                />
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              La plateforme qui révolutionne les connexions entre 
              <span className="text-purple-300 font-medium"> artistes </span> 
              et 
              <span className="text-blue-300 font-medium"> professionnels </span> 
              du secteur musical
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={scrollToForm}
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25 animate-glow"
              >
                Rejoindre la communauté
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="ghost"
                className="group text-white border border-white/20 hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover-lift"
                onClick={scrollToVideo}
              >
                <Play className="mr-2 w-5 h-5" />
                Voir la démo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Boostez votre visibilité musicale</h3>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm hover-lift animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Trouvez facilement les bons contacts</h3>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 backdrop-blur-sm hover-lift animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Développez vos projets et votre carrière</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Découvrez MusicLinks
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              En quelques minutes, comprenez comment nous révolutionnons les connexions musicales
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div 
                className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm cursor-pointer relative"
                onClick={handleVideoClick}
              >
                <video 
                  ref={setVideoRef}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  controls
                  preload="metadata"
                >
                  <source src="/teaser.mp4" type="video/mp4" />
                  <p className="p-8 text-center text-gray-400 text-lg">
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </p>
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Pourquoi MusicLinks ?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Une plateforme conçue pour les professionnels, par des professionnels
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Visibilité Maximale</h3>
              <p className="text-gray-300 leading-relaxed">
                Gagnez en visibilité auprès des professionnels du secteur musical avec un profil optimisé et des outils de promotion avancés.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Connexions Qualifiées</h3>
              <p className="text-gray-300 leading-relaxed">
                Trouvez les bons profils facilement grâce à notre algorithme intelligent et nos filtres de recherche avancés.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Carrière Boostée</h3>
              <p className="text-gray-300 leading-relaxed">
                Développez votre activité musicale avec des opportunités de collaboration et des projets innovants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="pre-inscription" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-12 relative z-20">
                  <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">
                    <BlurText
                      text="Rejoignez la liste d'attente"
                      delay={100}
                      animateBy="words"
                      direction="top"
                      className=""
                    />
                  </h1>
                  <div className="inline-flex items-center space-x-2 mb-6 text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Crown className="w-4 h-4" />
                    <span>Accès prioritaire</span>
                  </div>
                </div>
                
                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input 
                          {...register("firstName", { required: "Requis" })}
                          placeholder="Prénom *" 
                          className="h-12 text-base border-white/20 bg-white/5 focus:border-purple-500 focus:bg-white/10 text-white placeholder:text-gray-400 rounded-xl transition-all duration-300"
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-400">{errors.firstName.message as string}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input 
                          {...register("lastName", { required: "Requis" })}
                          placeholder="Nom *" 
                          className="h-12 text-base border-white/20 bg-white/5 focus:border-purple-500 focus:bg-white/10 text-white placeholder:text-gray-400 rounded-xl transition-all duration-300"
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-400">{errors.lastName.message as string}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
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
                        className="h-12 text-base border-white/20 bg-white/5 focus:border-purple-500 focus:bg-white/10 text-white placeholder:text-gray-400 rounded-xl transition-all duration-300"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400">{errors.email.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <select 
                        {...register("profileType", { required: "Requis" })}
                        className="h-12 text-base border border-white/20 bg-white/5 focus:border-purple-500 focus:bg-white/10 text-white rounded-xl transition-all duration-300 w-full px-3"
                      >
                        <option value="">Type de profil *</option>
                        <option value="artiste">Artiste</option>
                        <option value="prestataire">Prestataire</option>
                        <option value="partenaire">Partenaire</option>
                      </select>
                      {errors.profileType && (
                        <p className="text-sm text-red-400">{errors.profileType.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Textarea 
                        {...register("message")}
                        placeholder="Message (optionnel)" 
                        className="text-base border-white/20 bg-white/5 focus:border-purple-500 focus:bg-white/10 text-white placeholder:text-gray-400 rounded-xl transition-all duration-300 min-h-[120px] resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25"
                    >
                      {isSubmitting ? "Inscription en cours..." : "Rejoindre MusicLinks"}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Merci !</h3>
                <p className="text-xl text-gray-300 mb-4">
                  Votre pré-inscription a été enregistrée avec succès.
                </p>
                <p className="text-lg text-gray-400">
                  Nous prendrons contact avec vous prochainement pour vous donner accès à la plateforme.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/favIcon.png" alt="MusicLinks" className="w-6 h-6" />
              <span className="text-lg font-bold text-white">MusicLinks</span>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0 hover:bg-purple-500/20 border border-white/20 hover:border-purple-500/40 transition-all duration-300"
                onClick={() => window.open('https://www.instagram.com/musiclinksapp/', '_blank')}
              >
                <Instagram className="w-4 h-4" />
              </Button>
                             <Button 
                 variant="ghost" 
                 size="sm" 
                 className="w-10 h-10 p-0 hover:bg-purple-500/20 border border-white/20 hover:border-purple-500/40 transition-all duration-300"
                 onClick={() => window.open('https://www.tiktok.com/@musiclinksapp', '_blank')}
               >
                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                 </svg>
               </Button>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2025 MusicLinks. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;