import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, Calendar, Edit, Building2, Users } from "lucide-react";

interface Amphitheater {
  id: string;
  name: string;
  slug: string;
  university: string;
  location: string;
  capacity: number;
  description?: string;
  photos: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AmphitheaterDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amphitheater: Amphitheater | null;
  onEdit: (amphitheater: any) => void;
}

const AmphitheaterDetailModal = ({ open, onOpenChange, amphitheater, onEdit }: AmphitheaterDetailModalProps) => {
  if (!amphitheater) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span>{amphitheater.name}</span>
            </DialogTitle>
            {getStatusBadge(amphitheater.status)}
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
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Université:</span>
                    <span className="font-medium">{amphitheater.university}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Localisation:</span>
                    <span className="font-medium">{amphitheater.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">Slug:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{amphitheater.slug}</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Capacité</h3>
                <div className="bg-accent-light p-4 rounded-lg text-center">
                  <div className={`text-3xl font-bold ${getCapacityColor(amphitheater.capacity)}`}>
                    {amphitheater.capacity}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>places assises</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {amphitheater.description && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {amphitheater.description}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-foreground mb-2">Statistiques</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary-light rounded-lg">
                    <span className="text-sm font-medium">Photos</span>
                    <span className="text-lg font-bold text-primary">{amphitheater.photos}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
                    <span className="text-sm font-medium">Taux d'occupation</span>
                    <span className="text-lg font-bold text-success">85%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Dates</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Créé le:</span>
                    <span>15 février 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Modifié le:</span>
                    <span>20 mars 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photos placeholder */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Photos ({amphitheater.photos})</h3>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: Math.min(amphitheater.photos, 6) }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video bg-muted rounded-lg flex items-center justify-center"
                >
                  <GraduationCap className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Équipements */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Équipements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Projecteur", "Sonorisation", "Climatisation", "WiFi", "Tableau interactif", "Éclairage LED"].map((equipment, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">{equipment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button variant="accent" onClick={() => onEdit(amphitheater)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AmphitheaterDetailModal;