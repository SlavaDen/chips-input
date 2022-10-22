import React, { memo, useEffect, useState } from 'react';
import { ChipInput, ChipsWrapper } from 'components';
import { ChipsInputProps } from './ChipsInput.types';

const ChipsInputProto = ({ chips, setChips }: ChipsInputProps) => {
  const [chipsArray, setChipsArray] = useState<string[]>(chips.split(','));
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setChips(chipsArray.filter((chip) => chip.length).join(','));
  }, [chipsArray, setChips]);

  return (
    <>
      <ChipsWrapper
        chips={chipsArray}
        setChips={setChipsArray}
        setError={setError}
      >
        {chipsArray.map((chip, i) => (
          <ChipInput key={i} chip={chip} />
        ))}
      </ChipsWrapper>
      {error}
    </>
  );
};

export const ChipsInput = memo(ChipsInputProto);
