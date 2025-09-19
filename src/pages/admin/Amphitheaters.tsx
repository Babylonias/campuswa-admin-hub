import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, Search, MapPin, Edit, Trash2, Eye, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Amphitheaters = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - À remplacer par vos vraies données API
  const amphitheaters = [
    {
      id: 1,
      name: "Amphithéâtre Cheikh Anta Diop",
      slug: "amphi-cad",
      university: "Université Cheikh Anta Diop",
      location: "Dakar, Sénégal",
      capacity: 500,
      photos: 3,
      status: "active"
    },
    {
      id: 2,
      name: "Grand Amphithéâtre UGB",
      slug: "grand-amphi-ugb",
      university: "Université Gaston Berger",
      location: "Saint-Louis, Sénégal",
      capacity: 800,
      photos: 5,
      status: "active"
    },
    {
      id: 3,
      name: "Amphithéâtre Léopold Sédar Senghor",
      slug: "amphi-lss",
      university: "Université Cheikh Anta Diop",
      location: "Dakar, Sénégal",
      capacity: 300,
      photos: 2,
      status: "maintenance"
    },
    {
      id: 4,
      name: "Amphithéâtre Central",
      slug: "amphi-central-ziguinchor",
      university: "Université Assane Seck",
      location: "Ziguinchor, Sénégal",
      capacity: 400,
      photos: 4,
      status: "active"
    },
    {
      id: 5,
      name: "Amphithéâtre Birago Diop",
      slug: "amphi-birago-diop",
      university: "Université Alioune Diop",
      location: "Bambey, Sénégal",
      capacity: 250,
      photos: 3,
      status: "draft"
    }
  ];

  const filteredAmphitheaters = amphitheaters.filter(amphi =>
    amphi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amphi.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amphi.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-success text-success-foreground">Actif</Badge>;
      case "maintenance":
        return <Badge variant="default" className="bg-warning text-warning-foreground">Maintenance</Badge>;
      case "draft":
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 600) return "text-success";
    if (capacity >= 400) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-accent" />
            <span>Amphithéâtres</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez tous les amphithéâtres de vos universités
          </p>
        </div>
        
        <Link to="/admin/amphitheaters/new">
          <Button variant="accent" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Ajouter Amphithéâtre</span>
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card className="shadow-md border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, université ou localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/50 border-0"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Filtres
              </Button>
              <Button variant="outline" size="sm">
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amphitheaters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmphitheaters.map((amphitheater) => (
          <Card key={amphitheater.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1 group-hover:text-accent transition-colors">
                    {amphitheater.name}
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm">
                      <Building2 className="h-3 w-3" />
                      <span>{amphitheater.university}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{amphitheater.location}</span>
                    </div>
                  </CardDescription>
                </div>
                {getStatusBadge(amphitheater.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p><strong>Slug:</strong> {amphitheater.slug}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">Capacité:</span>
                  <span className={`text-lg font-bold ${getCapacityColor(amphitheater.capacity)}`}>
                    {amphitheater.capacity}
                  </span>
                  <span className="text-sm text-muted-foreground">places</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="text-sm">{amphitheater.photos} photos</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button size="sm" variant="ghost" className="flex-1 hover:bg-accent-light hover:text-accent">
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button size="sm" variant="ghost" className="flex-1 hover:bg-primary-light hover:text-primary">
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button size="sm" variant="ghost" className="hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-md border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {amphitheaters.length}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {amphitheaters.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Actifs</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {amphitheaters.filter(a => a.status === 'maintenance').length}
            </div>
            <div className="text-sm text-muted-foreground">Maintenance</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {amphitheaters.reduce((sum, a) => sum + a.capacity, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Capacité totale</div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {filteredAmphitheaters.length === 0 && (
        <Card className="shadow-md border-0">
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun amphithéâtre trouvé</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Aucun résultat pour votre recherche." : "Commencez par ajouter votre premier amphithéâtre."}
            </p>
            <Link to="/admin/amphitheaters/new">
              <Button variant="accent">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Amphithéâtre
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Amphitheaters;