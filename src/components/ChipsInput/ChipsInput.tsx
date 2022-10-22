import React, { memo } from 'react';
import { ChipsInputProps } from './ChipsInput.types';

const ChipsInputProto = ({ chips, setChips }: ChipsInputProps) => {
  return <div>ChipsInput</div>;
};

export const ChipsInput = memo(ChipsInputProto);
