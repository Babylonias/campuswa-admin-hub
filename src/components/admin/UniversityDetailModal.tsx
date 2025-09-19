import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, Edit, GraduationCap } from "lucide-react";

interface University {
  id: string;
  name: string;
  slug: string;
  location: string;
  description?: string;
  photos: number;
  amphitheaters: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UniversityDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university: University | null;
  onEdit: (university: University) => void;
}

const UniversityDetailModal = ({ open, onOpenChange, university, onEdit }: UniversityDetailModalProps) => {
  if (!university) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-primary" />
              <span>{university.name}</span>
            </DialogTitle>
            {getStatusBadge(university.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations principales */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Informations générales</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Localisation:</span>
                    <span className="font-medium">{university.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">Slug:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{university.slug}</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Statistiques</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-light p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{university.photos}</div>
                    <div className="text-xs text-muted-foreground">Photos</div>
                  </div>
                  <div className="bg-accent-light p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent">{university.amphitheaters}</div>
                    <div className="text-xs text-muted-foreground">Amphithéâtres</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {university.description && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {university.description}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-foreground mb-2">Dates</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Créé le:</span>
                    <span>12 janvier 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Modifié le:</span>
                    <span>15 mars 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photos placeholder */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Photos ({university.photos})</h3>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: Math.min(university.photos, 6) }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video bg-muted rounded-lg flex items-center justify-center"
                >
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Amphithéâtres associés */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Amphithéâtres associés ({university.amphitheaters})</span>
            </h3>
            <div className="space-y-2">
              {/* Mock amphitheaters */}
              {["Amphithéâtre Principal", "Amphithéâtre Cheikh Anta Diop", "Grand Amphithéâtre"].slice(0, university.amphitheaters).map((name, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    <span className="font-medium">{name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 500) + 200} places
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button onClick={() => onEdit(university)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniversityDetailModal;