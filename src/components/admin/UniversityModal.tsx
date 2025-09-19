import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface University {
  id?: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  photos: string[];
}

interface UniversityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university?: University | null;
  onSave: (university: University) => void;
}

const UniversityModal = ({ open, onOpenChange, university, onSave }: UniversityModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<University>({
    name: "",
    slug: "",
    location: "",
    description: "",
    photos: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (university) {
      setFormData(university);
    } else {
      setFormData({
        name: "",
        slug: "",
        location: "",
        description: "",
        photos: []
      });
    }
  }, [university, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if creating new university
      ...(name === 'name' && !university && { 
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
      })
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
        title: university ? "Université modifiée" : "Université créée",
        description: university 
          ? "L'université a été modifiée avec succès." 
          : "L'université a été créée avec succès.",
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
            {university ? "Modifier l'université" : "Ajouter une université"}
          </DialogTitle>
          <DialogDescription>
            {university 
              ? "Modifiez les informations de l'université" 
              : "Remplissez les informations pour créer une nouvelle université"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'université *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Université Cheikh Anta Diop"
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
                placeholder="ucad-dakar"
                required
              />
              {!university && (
                <p className="text-xs text-muted-foreground">
                  URL conviviale générée automatiquement
                </p>
              )}
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
              placeholder="Description de l'université..."
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
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UniversityModal;