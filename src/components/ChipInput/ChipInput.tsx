import React, { memo, useCallback } from 'react';
import { ChipInputProps } from './ChipInput.types';
import styles from './ChipInput.module.css';

const ChipInputProto = ({
  chip,
  index,
  isSelected,
  updateChip,
  blurChip,
  deleteChip,
  selectChip,
}: ChipInputProps) => {
  const onUpdateChip = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateChip(e, index);
    },
    [updateChip, index]
  );

  const onBlurChip = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      blurChip(e, index);
    },
    [blurChip, index]
  );

  const onDeleteChip = useCallback(() => {
    deleteChip(index);
  }, [deleteChip, index]);

  const onSelectChip = useCallback(() => {
    selectChip(index);
  }, [selectChip, index]);

  return (
    <li
      className={`${styles.chip} ${isSelected && styles.selectedChip}`}
      onClick={onSelectChip}
    >
      <input
        value={chip}
        onChange={onUpdateChip}
        onBlur={onBlurChip}
        className={styles.chipInput}
      />
      <span onClick={onDeleteChip} className={styles.closeIcon}>
        &#10006;
      </span>
    </li>
  );
};

export const ChipInput = memo(ChipInputProto);
