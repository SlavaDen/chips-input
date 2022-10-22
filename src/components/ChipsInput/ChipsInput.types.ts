import { Dispatch, SetStateAction } from 'react';

export interface ChipsInputProps {
  chips: string;
  setChips: Dispatch<SetStateAction<string>>;
}
