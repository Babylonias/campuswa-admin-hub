import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, Users, MapPin, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import UniversityModal from "@/components/admin/UniversityModal";
import AmphitheaterModal from "@/components/admin/AmphitheaterModal";

const Dashboard = () => {
  const [isUniversityModalOpen, setIsUniversityModalOpen] = useState(false);
  const [isAmphitheaterModalOpen, setIsAmphitheaterModalOpen] = useState(false);

  const stats = [
    {
      title: "Universités",
      value: "12",
      description: "+2 ce mois",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary-light",
      trend: "+16.7%"
    },
    {
      title: "Amphithéâtres",
      value: "48",
      description: "+8 ce mois",
      icon: GraduationCap,
      color: "text-accent",
      bgColor: "bg-accent-light",
      trend: "+20.0%"
    },
    {
      title: "Utilisateurs",
      value: "1,247",
      description: "+189 ce mois",
      icon: Users,
      color: "text-success",
      bgColor: "bg-success-light",
      trend: "+18.2%"
    },
    {
      title: "Localisations",
      value: "60",
      description: "+10 ce mois",
      icon: MapPin,
      color: "text-warning",
      bgColor: "bg-warning-light",
      trend: "+20.0%"
    }
  ];

  const recentActivities = [
    {
      title: "Université de Dakar",
      description: "Nouvelle université ajoutée",
      time: "Il y a 2 heures",
      type: "university"
    },
    {
      title: "Amphithéâtre Grand Magal",
      description: "Amphithéâtre mis à jour",
      time: "Il y a 4 heures",
      type: "amphitheater"
    },
    {
      title: "Université Cheikh Anta Diop",
      description: "Photos mises à jour",
      time: "Il y a 1 jour",
      type: "university"
    },
    {
      title: "Amphithéâtre Léopold Sédar",
      description: "Localisation mise à jour",
      time: "Il y a 2 jours",
      type: "amphitheater"
    }
  ];

  const handleSaveUniversity = (universityData) => {
    console.log("Nouvelle université:", universityData);
    // TODO: Ajouter la logique de sauvegarde
  };

  const handleSaveAmphitheater = (amphitheaterData) => {
    console.log("Nouvel amphithéâtre:", amphitheaterData);
    // TODO: Ajouter la logique de sauvegarde
  };
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de votre plateforme campusWa
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            className="flex items-center space-x-2"
            onClick={() => setIsUniversityModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter Université</span>
          </Button>
          <Button 
            variant="accent" 
            className="flex items-center space-x-2"
            onClick={() => setIsAmphitheaterModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter Amphithéâtre</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-sm font-medium text-success">
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Activités Récentes</span>
            </CardTitle>
            <CardDescription>
              Dernières modifications sur votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg ${activity.type === 'university' ? 'bg-primary-light' : 'bg-accent-light'}`}>
                  {activity.type === 'university' ? (
                    <Building2 className={`h-4 w-4 ${activity.type === 'university' ? 'text-primary' : 'text-accent'}`} />
                  ) : (
                    <GraduationCap className="h-4 w-4 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>
              Accès rapide aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center space-y-2 hover:bg-primary-light hover:border-primary"
                onClick={() => window.location.href = '/admin/universities'}
              >
                <Building2 className="h-6 w-6" />
                <span className="text-sm">Gérer Universités</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center space-y-2 hover:bg-accent-light hover:border-accent"
                onClick={() => window.location.href = '/admin/amphitheaters'}
              >
                <GraduationCap className="h-6 w-6" />
                <span className="text-sm">Gérer Amphithéâtres</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center space-y-2 hover:bg-success-light hover:border-success"
                onClick={() => window.location.href = '/admin/users'}
              >
                <Users className="h-6 w-6" />
                <span className="text-sm">Utilisateurs</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center space-y-2 hover:bg-warning-light hover:border-warning"
                onClick={() => window.location.href = '/admin/settings'}
              >
                <MapPin className="h-6 w-6" />
                <span className="text-sm">Paramètres</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <UniversityModal
        open={isUniversityModalOpen}
        onOpenChange={setIsUniversityModalOpen}
        university={null}
        onSave={handleSaveUniversity}
      />

      <AmphitheaterModal
        open={isAmphitheaterModalOpen}
        onOpenChange={setIsAmphitheaterModalOpen}
        amphitheater={null}
        onSave={handleSaveAmphitheater}
      />
    </div>
  );
};

export default Dashboard;