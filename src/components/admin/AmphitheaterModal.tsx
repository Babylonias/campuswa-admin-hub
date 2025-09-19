import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Amphitheater {
  id?: string;
  name: string;
  slug: string;
  universityId: string;
  location: string;
  capacity: string;
  description: string;
  photos: string[];
}

interface AmphitheaterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amphitheater?: Amphitheater | null;
  onSave: (amphitheater: Amphitheater) => void;
}

const AmphitheaterModal = ({ open, onOpenChange, amphitheater, onSave }: AmphitheaterModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Amphitheater>({
    name: "",
    slug: "",
    universityId: "",
    location: "",
    capacity: "",
    description: "",
    photos: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock universities data
  const universities = [
    { id: "1", name: "Université Cheikh Anta Diop" },
    { id: "2", name: "Université Gaston Berger" },
    { id: "3", name: "Université Assane Seck" },
    { id: "4", name: "Université Alioune Diop" }
  ];

  useEffect(() => {
    if (amphitheater) {
      setFormData(amphitheater);
    } else {
      setFormData({
        name: "",
        slug: "",
        universityId: "",
        location: "",
        capacity: "",
        description: "",
        photos: []
      });
    }
  }, [amphitheater, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if creating new amphitheater
      ...(name === 'name' && !amphitheater && { 
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
      })
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
      
      onSave(formData);
      
      toast({
        title: amphitheater ? "Amphithéâtre modifié" : "Amphithéâtre créé",
        description: amphitheater 
          ? "L'amphithéâtre a été modifié avec succès." 
          : "L'amphithéâtre a été créé avec succès.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'opération.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {amphitheater ? "Modifier l'amphithéâtre" : "Ajouter un amphithéâtre"}
          </DialogTitle>
          <DialogDescription>
            {amphitheater 
              ? "Modifiez les informations de l'amphithéâtre" 
              : "Remplissez les informations pour créer un nouvel amphithéâtre"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
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
              {!amphitheater && (
                <p className="text-xs text-muted-foreground">
                  URL conviviale générée automatiquement
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Photos</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Glissez-déposez vos photos ici
              </p>
              <Button type="button" variant="outline" size="sm">
                Choisir des fichiers
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} variant="accent">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AmphitheaterModal;