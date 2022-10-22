import React, { memo } from 'react';
import { ChipInputProps } from './ChipInput.types';

const ChipInputProto = ({ chip }: ChipInputProps) => {
  return (
    <li>
      {
        //TODO: Доделать во втором пункте. Заглушка чтобы не было ошибки
      }
      <input value={chip} onChange={() => {}} />
      <span>Убрать</span>
    </li>
  );
};

export const ChipInput = memo(ChipInputProto);
