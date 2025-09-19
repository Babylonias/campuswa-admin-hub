import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Search, MapPin, Edit, Trash2, Eye } from "lucide-react";
import UniversityModal from "@/components/admin/UniversityModal";
import UniversityDetailModal from "@/components/admin/UniversityDetailModal";

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universities, setUniversities] = useState([

    {
      id: 1,
      name: "Université Cheikh Anta Diop",
      slug: "ucad-dakar",
      location: "Dakar, Sénégal",
      description: "Principale université du Sénégal fondée en 1957.",
      photos: 5,
      amphitheaters: 12,
      status: "active"
    },
    {
      id: 2,
      name: "Université Gaston Berger",
      slug: "ugb-saint-louis",
      location: "Saint-Louis, Sénégal",
      description: "Université moderne spécialisée dans les sciences et technologies.",
      photos: 8,
      amphitheaters: 8,
      status: "active"
    },
    {
      id: 3,
      name: "Université Assane Seck",
      slug: "univ-ziguinchor",
      location: "Ziguinchor, Sénégal",
      description: "Université régionale du sud du Sénégal.",
      photos: 3,
      amphitheaters: 6,
      status: "draft"
    },
    {
      id: 4,
      name: "Université Alioune Diop",
      slug: "uadb-bambey",
      location: "Bambey, Sénégal",
      description: "Université agricole et de développement rural.",
      photos: 4,
      amphitheaters: 7,
      status: "active"
    }
  ]);

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-success text-success-foreground">Actif</Badge>;
      case "draft":
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAddUniversity = () => {
    setSelectedUniversity(null);
    setIsModalOpen(true);
  };

  const handleEditUniversity = (university) => {
    setSelectedUniversity(university);
    setIsModalOpen(true);
  };

  const handleViewUniversity = (university) => {
    setSelectedUniversity(university);
    setIsDetailModalOpen(true);
  };

  const handleSaveUniversity = (universityData) => {
    if (selectedUniversity) {
      // Update existing university
      setUniversities(prev => prev.map(u => 
        u.id === selectedUniversity.id 
          ? { ...u, ...universityData }
          : u
      ));
    } else {
      // Add new university
      const newUniversity = {
        ...universityData,
        id: Date.now(),
        photos: 0,
        amphitheaters: 0
      };
      setUniversities(prev => [...prev, newUniversity]);
    }
  };

  const handleEditFromDetail = (university) => {
    setIsDetailModalOpen(false);
    setSelectedUniversity(university);
    setIsModalOpen(true);
  };
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-primary" />
            <span>Universités</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez toutes les universités de votre plateforme
          </p>
        </div>
        
        <Button variant="default" className="flex items-center space-x-2" onClick={handleAddUniversity}>
          <Plus className="h-4 w-4" />
          <span>Ajouter Université</span>
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="shadow-md border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou localisation..."
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

      {/* Universities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                    {university.name}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{university.location}</span>
                  </CardDescription>
                </div>
                {getStatusBadge(university.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p><strong>Slug:</strong> {university.slug}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{university.photos} photos</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    <span>{university.amphitheaters} amphithéâtres</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="flex-1 hover:bg-primary-light hover:text-primary"
                  onClick={() => handleViewUniversity(university)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="flex-1 hover:bg-accent-light hover:text-accent"
                  onClick={() => handleEditUniversity(university)}
                >
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

      {/* Empty State */}
      {filteredUniversities.length === 0 && (
        <Card className="shadow-md border-0">
          <CardContent className="p-12 text-center">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucune université trouvée</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Aucun résultat pour votre recherche." : "Commencez par ajouter votre première université."}
            </p>
            <Button onClick={handleAddUniversity}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une Université
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <UniversityModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        university={selectedUniversity}
        onSave={handleSaveUniversity}
      />

      <UniversityDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        university={selectedUniversity}
        onEdit={handleEditFromDetail}
      />
    </div>
  );
};

export default Universities;