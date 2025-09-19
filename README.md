# CampusWA - Plateforme de Gestion d'Universités et d'Amphithéâtres

## 🎓 Description

CampusWA est une application web moderne de gestion administrative pour les universités et leurs amphithéâtres. Elle permet de centraliser et gérer efficacement les informations des établissements d'enseignement supérieur et de leurs infrastructures.

## ✨ Fonctionnalités

### 🏠 Page d'Accueil
- Présentation attractive du projet CampusWA
- Design moderne avec gradients et animations
- Navigation intuitive vers le panel d'administration

### 🔧 Panel d'Administration
- **Dashboard**: Vue d'ensemble avec statistiques et métriques clés
- **Gestion des Universités**: CRUD complet pour les universités
- **Gestion des Amphithéâtres**: CRUD complet pour les amphithéâtres
- Interface responsive et intuitive
- Sidebar de navigation avec indicateurs visuels
- Header avec informations utilisateur

### 📊 Fonctionnalités CRUD

#### Universités
- ✅ Lister toutes les universités
- ✅ Créer une nouvelle université
- ✅ Modifier une université existante
- ✅ Recherche et filtres
- ✅ Gestion des statuts (Actif, Brouillon)

#### Amphithéâtres
- ✅ Lister tous les amphithéâtres
- ✅ Créer un nouvel amphithéâtre
- ✅ Modifier un amphithéâtre existant
- ✅ Association avec les universités
- ✅ Gestion de la capacité et statuts
- ✅ Statistiques de capacité

## 🛠 Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique pour plus de robustesse
- **Vite** - Bundler rapide pour le développement
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router Dom** - Routage côté client
- **Lucide React** - Icônes modernes

### UI Components
- **Radix UI** - Composants accessibles et personnalisables
- **Shadcn/ui** - Système de design components
- **React Hook Form** - Gestion des formulaires
- **Sonner** - Notifications toast élégantes

### État et Données
- **TanStack Query** - Gestion d'état serveur et cache
- **Zod** - Validation de schémas TypeScript

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 20+ 
- npm ou yarn ou bun

### Installation
```bash
# Cloner le repository
git clone [url-du-repository]
cd campuswa

# Installer les dépendances
npm install
# ou
yarn install
# ou
bun install

# Démarrer le serveur de développement
npm run dev
# ou
yarn dev
# ou
bun dev
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── admin/          # Composants spécifiques à l'admin
│   └── ui/             # Composants UI de base (shadcn)
├── pages/              # Pages de l'application
│   ├── admin/          # Pages d'administration
│   │   ├── universities/   # Pages CRUD universités
│   │   └── amphitheaters/  # Pages CRUD amphithéâtres
│   └── Home.tsx        # Page d'accueil
├── hooks/              # Hooks React personnalisés
├── lib/                # Utilitaires et configurations
└── assets/             # Images et ressources statiques
```

## 🎨 Design System

### Palette de Couleurs
- **Primaire**: Bleu éducatif (`hsl(213, 94%, 68%)`)
- **Accent**: Violet moderne (`hsl(262, 83%, 58%)`)
- **Succès**: Vert validation (`hsl(146, 64%, 47%)`)
- **Attention**: Orange (`hsl(32, 95%, 59%)`)

### Gradients
- **Primaire**: Dégradé bleu-violet pour les éléments héros
- **Subtil**: Dégradés légers pour les backgrounds
- **Glow**: Effets de lueur pour les interactions

### Animations
- Transitions fluides (`cubic-bezier(0.4, 0, 0.2, 1)`)
- Animations d'apparition (`fade-in`)
- Effets de hover interactifs

## 🔌 Intégration API

L'application est prête pour l'intégration avec vos APIs existantes. Les points d'intégration sont marqués par des commentaires `TODO` dans le code :

### Endpoints Requis

#### Universités
- `GET /api/universities` - Liste des universités
- `POST /api/universities` - Créer une université
- `GET /api/universities/:id` - Détails d'une université
- `PUT /api/universities/:id` - Modifier une université
- `DELETE /api/universities/:id` - Supprimer une université

#### Amphithéâtres
- `GET /api/amphitheaters` - Liste des amphithéâtres
- `POST /api/amphitheaters` - Créer un amphithéâtre
- `GET /api/amphitheaters/:id` - Détails d'un amphithéâtre
- `PUT /api/amphitheaters/:id` - Modifier un amphithéâtre
- `DELETE /api/amphitheaters/:id` - Supprimer un amphithéâtre

### Structure des Données

#### Université
```typescript
interface University {
  id: string;
  name: string;
  slug: string;
  location: string;
  description?: string;
  photos: string[];
  status: 'active' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}
```

#### Amphithéâtre
```typescript
interface Amphitheater {
  id: string;
  name: string;
  slug: string;
  universityId: string;
  location: string;
  capacity: number;
  description?: string;
  photos: string[];
  status: 'active' | 'maintenance' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Configuration

### Variables d'Environnement
Créez un fichier `.env.local` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=CampusWA
```

### Personnalisation du Design
Le système de design peut être personnalisé via :
- `src/index.css` - Variables CSS et tokens de design
- `tailwind.config.ts` - Configuration Tailwind personnalisée

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints optimisés :
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Déploiement

### Build de Production
```bash
npm run build
# ou
yarn build
# ou
bun run build
```

Les fichiers de production seront générés dans le dossier `dist/`

### Déploiement sur Lovable
L'application est hébergée sur Lovable et peut être déployée en un clic via le bouton "Publish" dans l'interface.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/ma-nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -am 'Ajout de ma nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/ma-nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.

---

**CampusWA** - Moderniser la gestion universitaire avec style et efficacité 🎓✨