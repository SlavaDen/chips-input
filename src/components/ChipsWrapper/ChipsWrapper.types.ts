import React, { Dispatch, SetStateAction } from 'react';

export interface ChipsWrapperProps {
  children: React.ReactNode;
  chips: string[];
  setChips: Dispatch<SetStateAction<string[]>>
  setError: Dispatch<SetStateAction<string>>
}
