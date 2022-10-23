import { quotesCounter } from 'helpers';
import React, { memo, useCallback } from 'react';
import { ChipInputProps } from './ChipInput.types';
import styles from './ChipInput.module.css';
import { MESSAGES } from 'constants/messages';

const ChipInputProto = ({
  chip,
  index,
  chips,
  selected,
  setChips,
  setError,
  updateChip,
  deleteChip,
  selectChip,
}: ChipInputProps) => {
  const onUpdateChip = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateChip(e, index);
    },
    [updateChip, index]
  );

  const onDeleteChip = useCallback(() => {
    deleteChip(index);
  }, [deleteChip, index]);

  const chipOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      const count = quotesCounter(inputValue);
      if (count % 2 === 0) {
        const chipsSlice = chips.slice();
        const newChips = inputValue.split(',');
        let quotePos = [];

        for (let i = 0; i < newChips.length; i++) {
          if (
            newChips[i].search('"') > -1 &&
            (newChips[i].match(/"/g) || []).length % 2 > 0
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
        setChips(chipsSlice);
        setError('');
      } else {
        setError(MESSAGES.CLOSE_QUOTES);
      }
    },
    [chips, index, setChips, setError]
  );

  const onSelectChip = useCallback(() => {
    selectChip(index);
  }, [selectChip, index]);

  return (
    <li
      className={`${styles.chip} ${selected && styles.selectedChip}`}
      onClick={onSelectChip}
    >
      <input
        value={chip}
        onChange={onUpdateChip}
        onBlur={chipOnBlur}
        className={styles.chipInput}
      />
      <span onClick={onDeleteChip} className={styles.closeIcon}>
        &#10006;
      </span>
    </li>
  );
};

export const ChipInput = memo(ChipInputProto);
