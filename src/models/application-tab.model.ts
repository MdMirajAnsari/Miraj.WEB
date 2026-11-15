export type GadgetTab = 'gadgets' | 'software' | 'songs' | 'entertainment';

export interface SetActiveTabProps {
  setActiveTab: (tab: GadgetTab) => void;
}
