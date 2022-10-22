import React, { memo } from 'react';
import { ChipInputProps } from './ChipInput.types';

const ChipInputProto = ({ chip }: ChipInputProps) => {
  return <div>ChipInput</div>;
};

export const ChipInput = memo(ChipInputProto);
