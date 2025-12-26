export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export enum VisualizerMode {
  KITCHEN = 'Kitchen Design',
  STONE = 'Stone Texture',
}

export interface DesignState {
  style: string;
  cabinetColor: string;
  countertopType: string;
  flooring: string;
  mode: VisualizerMode;
}
