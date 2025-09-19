import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Building2, Users, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-campuswa.jpg";

const Home = () => {
  const features = [
    {
      icon: Building2,
      title: "Gestion des Universités",
      description: "Enregistrez et gérez facilement toutes les informations des universités : nom, slug, photos et localisation."
    },
    {
      icon: GraduationCap,
      title: "Amphithéâtres",
      description: "Cataloguez les amphithéâtres avec tous leurs détails : capacité, équipements et localisation précise."
    },
    {
      icon: Users,
      title: "Interface Admin",
      description: "Panel d'administration moderne et intuitif pour gérer efficacement votre plateforme éducative."
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Intégration complète des données de localisation pour chaque établissement et infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                campusWa
              </span>
            </div>
            <Link to="/admin">
              <Button variant="hero">
                Accéder à l'Admin
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Gérez vos{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Campus
                  </span>{" "}
                  avec Simplicité
                </h1>
                <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                  campusWa est la plateforme d'administration moderne pour gérer 
                  efficacement vos universités et amphithéâtres. Une interface 
                  intuitive pour tous vos besoins éducatifs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admin">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Commencer Maintenant
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  En Savoir Plus
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>API Intégrée</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Interface Moderne</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Gestion Complète</span>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="Campus Management Platform" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">
              Fonctionnalités{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Principales
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez tous les outils dont vous avez besoin pour gérer 
              efficacement vos établissements éducatifs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-gradient-to-br from-background to-secondary/30"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white animate-slide-up">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à Transformer Votre Gestion Campus ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Accédez dès maintenant au panel d'administration et commencez 
              à gérer vos universités et amphithéâtres avec campusWa.
            </p>
            <Link to="/admin">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Accéder à l'Administration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-bold">campusWa</span>
            </div>
            <p className="text-sm opacity-70">
              © 2024 campusWa. Plateforme de gestion éducative moderne.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;