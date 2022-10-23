export interface ChipInputProps {
  chip: string;
  index: number;
  chips: string[];
  selected: boolean;
  setChips: (chips: string[])=>void;
  setError: (error: string)=>void;
  deleteChip: (index: number)=> void;
  updateChip: (e: React.ChangeEvent<HTMLInputElement>, index: number)=> void;
  selectChip: (index: number)=> void;
};
