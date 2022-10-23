export interface ChipInputProps {
  chip: string;
  index: number;
  isSelected: boolean;
  deleteChip: (index: number)=> void;
  blurChip: (e: React.FocusEvent<HTMLInputElement>, index: number)=> void;
  updateChip: (e: React.ChangeEvent<HTMLInputElement>, index: number)=> void;
  selectChip: (index: number)=> void;
};
