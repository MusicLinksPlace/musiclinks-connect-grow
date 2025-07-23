const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Bienvenue sur MusicLinks</h1>
        <p className="text-xl text-muted-foreground">Connectez et développez votre réseau musical</p>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-card-foreground">Votre application est en cours de chargement...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
