import React, { memo, useCallback, useEffect, useState } from 'react';
import { ChipInput, ChipsWrapper } from 'components';
import { ChipsInputProps } from './ChipsInput.types';
import { quotesCounter } from 'helpers';
import styles from './ChipsInput.module.css';

const ChipsInputProto = ({ chips, setChips }: ChipsInputProps) => {
  const [chipsArray, setChipsArray] = useState<string[]>(chips.split(','));
  const [error, setError] = useState<string>('');

  const addChip = useCallback(
    (
      e:
        | React.FocusEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.currentTarget.value !== '') {
        const inputValue = e.currentTarget.value;
        const count = quotesCounter(inputValue);
        if (count % 2 !== 0) {
          setError('Закройте кавычки с двух сторон');
        } else {
          if (e.type === 'keyup') {
            setChipsArray([...chipsArray, inputValue.slice(0, -1)]);
          } else if (e.type === 'blur') {
            setChipsArray([...chipsArray, inputValue]);
          }
          e.currentTarget.value = '';
          setError('');
        }
      }
    },
    [chipsArray, setChipsArray, setError]
  );

  const updateChip = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const editedChips = chipsArray
        .map((chip, chipIndex) => {
          return chipIndex === index ? e.target.value : chip;
        })
        .filter((chip) => chip !== '');
      setChipsArray(editedChips);
    },
    [chipsArray]
  );

  const deleteChip = useCallback(
    (index: number) => {
      const сhips = chipsArray.filter((_, i) => i !== index);
      setChipsArray(сhips);
    },
    [chipsArray]
  );

  useEffect(() => {
    setChips(chipsArray.filter((chip) => chip.length).join(','));
  }, [chipsArray, setChips]);

  return (
    <>
      <ChipsWrapper
        chips={chipsArray}
        addChip={addChip}
        deleteChip={deleteChip}
      >
        {chipsArray.map((chip, i) => (
          <ChipInput
            key={i}
            chip={chip}
            index={i}
            chips={chipsArray}
            setChips={setChipsArray}
            setError={setError}
            updateChip={updateChip}
            deleteChip={deleteChip}
          />
        ))}
      </ChipsWrapper>
      <p className={styles.error}>{error}</p>
    </>
  );
};

export const ChipsInput = memo(ChipsInputProto);
