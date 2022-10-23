import React, { memo, useCallback, useEffect, useState } from 'react';
import { ChipInput, ChipsWrapper } from 'components';
import { quotesCounter } from 'helpers';
import { MESSAGES } from 'constants/messages';
import { ChipsInputProps } from './ChipsInput.types';
import styles from './ChipsInput.module.css';

const ChipsInputProto = ({ chips, setChips }: ChipsInputProps) => {
  const [chipsArray, setChipsArray] = useState<string[]>(chips.split(','));
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [error, setError] = useState<string>('');

  const addChip = useCallback(
    (
      e:
        | React.FocusEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      const inputValue = e.currentTarget.value;
      if (inputValue && !/^[,\s]+$/.test(inputValue)) {
        const count = quotesCounter(inputValue);
        if (count % 2 !== 0) {
          setError(MESSAGES.CLOSE_QUOTES);
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
    [chipsArray, setChipsArray]
  );

  const deleteChip = useCallback(
    (index: number) => {
      const сhips = chipsArray.filter((_, i) => i !== index);
      setChipsArray(сhips);
    },
    [chipsArray, setChipsArray]
  );

  const selectChip = useCallback(
    (index: number) => {
      if (selectedIndexes.some((selectedIndex) => selectedIndex === index)) {
        const indexes = selectedIndexes.filter(
          (selectedIndex) => selectedIndex !== index
        );
        setSelectedIndexes(indexes);
      } else {
        setSelectedIndexes([...selectedIndexes, index]);
      }
    },
    [setSelectedIndexes, selectedIndexes]
  );

  const deleteSelectedChips = useCallback(() => {
    if (selectedIndexes.length) {
      setChipsArray(chipsArray.filter((_, i) => selectedIndexes.includes(i)));
      setSelectedIndexes([]);
    }
  }, [setChipsArray, chipsArray, selectedIndexes, setSelectedIndexes]);

  useEffect(() => {
    setChips(chipsArray.filter((chip) => chip.length).join(','));
  }, [chipsArray, setChips]);

  // TODO: Изучить варианты реализации
  // document.addEventListener('keyup', function (e) {
  //   if (e.key === 'Backspace') {
  //     deleteSelectedChips();
  //   }
  // });

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
            selected={selectedIndexes.some(
              (selectedIndex) => selectedIndex === i
            )}
            setChips={setChipsArray}
            setError={setError}
            updateChip={updateChip}
            deleteChip={deleteChip}
            selectChip={selectChip}
          />
        ))}
      </ChipsWrapper>
      <p className={styles.error}>{error}</p>
    </>
  );
};

export const ChipsInput = memo(ChipsInputProto);
