
export interface StateMetadata {
  name: string;
  clients?: number; // Number of customers served in the state
  status?: 'Active' | 'Growing' | 'New';
}

export interface StateData extends StateMetadata {
  id: string; // generated ID or geojson ID
  d: string; // SVG path data calculated at runtime
  centroid: [number, number];
}

export interface TooltipState {
  visible: boolean;
  content: StateMetadata | null;
}
