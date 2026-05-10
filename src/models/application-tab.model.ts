export type GadgetTab = 'gadgets' | 'software' | 'songs';

export interface SetActiveTabProps {
  setActiveTab: (tab: GadgetTab) => void;
}
