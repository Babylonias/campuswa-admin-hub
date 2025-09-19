import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EditAmphitheater = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    universityId: "",
    location: "",
    capacity: "",
    description: "",
    photos: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Mock universities data
  const universities = [
    { id: "1", name: "Université Cheikh Anta Diop" },
    { id: "2", name: "Université Gaston Berger" },
    { id: "3", name: "Université Assane Seck" },
    { id: "4", name: "Université Alioune Diop" }
  ];

  useEffect(() => {
    // TODO: Remplacer par votre appel API pour récupérer les données
    const fetchAmphitheater = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setFormData({
          name: "Amphithéâtre Cheikh Anta Diop",
          slug: "amphi-cad",
          universityId: "1",
          location: "Dakar, Sénégal",
          capacity: "500",
          description: "Grand amphithéâtre principal de l'université.",
          photos: []
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'amphithéâtre.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchAmphitheater();
  }, [id, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      universityId: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Remplacer par votre appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Amphithéâtre modifié",
        description: "L'amphithéâtre a été modifié avec succès.",
      });
      
      navigate("/admin/amphitheaters");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/amphitheaters")}
          className="hover:bg-accent/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-accent" />
            <span>Modifier l'Amphithéâtre</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Modifiez les informations de l'amphithéâtre
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle>Informations de l'amphithéâtre</CardTitle>
          <CardDescription>
            Modifiez les informations de l'amphithéâtre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'amphithéâtre *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Amphithéâtre Cheikh Anta Diop"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="amphi-cad"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="university">Université *</Label>
                <Select value={formData.universityId} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une université" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((university) => (
                      <SelectItem key={university.id} value={university.id}>
                        {university.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité *</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Dakar, Sénégal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description de l'amphithéâtre..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  Glissez-déposez vos photos ici ou cliquez pour sélectionner
                </p>
                <Button type="button" variant="outline" size="sm">
                  Choisir des fichiers
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/amphitheaters")}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading} variant="accent">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Modification..." : "Sauvegarder"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAmphitheater;