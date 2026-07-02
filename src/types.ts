export interface CanvasBlock {
  id: string;
  title: string;
  icon: string;
  placeholder: string;
  question: string;
  pilar: 'mercado' | 'oferta' | 'infraestructura' | 'finanzas';
  tips: string[];
}

export interface CanvasData {
  partners: string;
  activities: string;
  resources: string;
  propositions: string;
  relations: string;
  channels: string;
  segments: string;
  costs: string;
  revenues: string;
}

export interface BusinessModelExample {
  name: string;
  description: string;
  emoji: string;
  data: CanvasData;
}
