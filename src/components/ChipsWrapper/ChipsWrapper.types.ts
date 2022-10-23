import React from 'react';

export interface ChipsWrapperProps {
  children: React.ReactNode;
  chips: string[];
  addChip: (e:
    | React.FocusEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>)=>void;
  deleteChip: (index: number)=> void;
}
