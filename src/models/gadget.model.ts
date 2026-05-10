export interface Gadget {
  id: string;
  name: string;
  description: string;
  image: string;
  specs?: string[];
  price?: string;
  link?: string;
  source?: string;
}

export interface EnrichedGadget extends Gadget {
  brand: string;
  category: string;
  priceValue: number;
  priceTier: string;
  isBuyLinkValid: boolean;
  isSourceValid: boolean;
  addedIndex: number;
}

export interface GadgetState {
  status: string;
  rating: number;
}
