import React, { memo, useCallback, useEffect, useState } from 'react';
import { ChipInput, ChipsWrapper } from 'components';
import { quotesCounter } from 'helpers';
import { MESSAGES } from 'constants/messages';
import { ChipsInputProps } from './ChipsInput.types';
import styles from './ChipsInput.module.css';

const notQuotesFirstReg = /^[,\s]+$/;
const quotesReg = /"/g;

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
      if (inputValue && !notQuotesFirstReg.test(inputValue)) {
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

  const blurChip = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, index: number) => {
      const inputValue = e.currentTarget.value;
      const count = quotesCounter(inputValue);
      if (count % 2 === 0) {
        const chipsSlice = chipsArray.slice();
        const newChips = inputValue.split(',');
        let quotePos = [];
        for (let i = 0; i < newChips.length; i++) {
          if (
            newChips[i].search('"') > -1 &&
            (newChips[i].match(quotesReg) || []).length % 2 > 0
          ) {
            quotePos.push(i);
          }
          if (
            quotePos.length > 1 ||
            (quotePos.length === 1 && i === newChips.length - 1)
          ) {
            const firstQuote = quotePos[0];
            const secondQuote = quotePos[1] ? quotePos[1] : newChips.length - 1;
            const slicedElems = newChips
              .slice(firstQuote, secondQuote + 1)
              .join(',');
            newChips.splice(
              firstQuote,
              secondQuote - firstQuote + 1,
              slicedElems
            );
            i = firstQuote;
            quotePos = [];
          }
        }
        chipsSlice.splice(index, 1, ...newChips);
        setChipsArray(chipsSlice);
        setError('');
      } else {
        setError(MESSAGES.CLOSE_QUOTES);
      }
    },
    [chipsArray, setChipsArray, setError]
  );

  const deleteSelectedChips = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedIndexes.length) {
        setChipsArray(
          chipsArray.filter((_, i) => !selectedIndexes.includes(i))
        );
        setSelectedIndexes([]);
      }
    },
    [setChipsArray, chipsArray, selectedIndexes, setSelectedIndexes]
  );

  useEffect(() => {
    setChips(chipsArray.filter((chip) => chip.length).join(','));
  }, [chipsArray, setChips]);

  useEffect(() => {
    document.addEventListener('keyup', deleteSelectedChips);

    return () => document.removeEventListener('keyup', deleteSelectedChips);
  });

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
            isSelected={selectedIndexes.some(
              (selectedIndex) => selectedIndex === i
            )}
            updateChip={updateChip}
            blurChip={blurChip}
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
