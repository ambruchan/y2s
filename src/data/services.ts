import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Photographie Sportive',
    description: 'Photographie d\'action et éditoriale de haute qualité pour les événements sportifs, capturant les moments décisifs qui racontent l\'histoire de la compétition.',
    icon: 'camera',
    features: [
      'Photographie d\'Action',
      'Couverture Éditoriale',
      'Portraits Après-Match',
      'Documentation d\'Entraînement',
      'Édition Photo & Étalonnage'
    ]
  },
  {
    id: '2',
    title: 'Vidéographie Sportive',
    description: 'Création de contenu vidéo dynamique, des événements en direct aux documentaires et contenus promotionnels pour les équipes et les marques.',
    icon: 'video',
    features: [
      'Résumés de Match',
      'Production Documentaire',
      'Vidéos Promotionnelles',
      'Contenu Réseaux Sociaux',
      'Montage & Post-Production'
    ]
  },
  {
    id: '3',
    title: 'Motion Design',
    description: 'Motion design et animations personnalisés pour la diffusion, les plateformes numériques et les réseaux sociaux pour valoriser votre marque sportive.',
    icon: 'layers',
    features: [
      'Packages Diffusion',
      'Animations Réseaux Sociaux',
      'Graphiques Événementiels',
      'Séquences de Titre',
      'Visualisation de Données'
    ]
  },
  {
    id: '4',
    title: 'Conseil Visuel',
    description: 'Direction visuelle stratégique et conseil pour les marques sportives, équipes et organisations souhaitant améliorer leur présence visuelle.',
    icon: 'trending-up',
    features: [
      'Stratégie Visuelle de Marque',
      'Planification de Contenu',
      'Développement d\'Identité Visuelle',
      'Audits de Contenu',
      'Création de Guide de Style'
    ]
  }
];