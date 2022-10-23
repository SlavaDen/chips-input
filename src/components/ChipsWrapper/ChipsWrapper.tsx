import React, { memo, useCallback } from 'react';
import { ChipsWrapperProps } from './ChipsWrapper.types';
import styles from './ChipsWrapper.module.css';

const ChipsWrapperProto = ({
  children,
  chips,
  addChip,
  deleteChip,
}: ChipsWrapperProps) => {
  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      if (inputValue === '' && e.key === 'Backspace') {
        deleteChip(chips.indexOf(chips[chips.length - 1]));
      }
      if (inputValue[inputValue.length - 1] === ',' && inputValue !== ',') {
        addChip(e);
      }
    },
    [addChip, deleteChip, chips]
  );

  return (
    <div className={styles.chipsWrapper}>
      {children}
      <input
        type='text'
        placeholder='Введите ключевые слова'
        className={styles.chipsWrapperInput}
        onBlur={addChip}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export const ChipsWrapper = memo(ChipsWrapperProto);
