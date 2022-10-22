import React, { memo, useCallback } from 'react';
import { ChipsWrapperProps } from './ChipsWrapper.types';
import styles from './ChipsWrapper.module.css';
import { quotesCounter } from 'helpers';

const ChipsWrapperProto = ({
  children,
  chips,
  setChips,
  setError,
}: ChipsWrapperProps) => {
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
            setChips([...chips, inputValue.slice(0, -1)]);
          } else if (e.type === 'blur') {
            setChips([...chips, inputValue]);
          }
          e.currentTarget.value = '';
          setError('');
        }
      }
    },
    [chips, setChips, setError]
  );

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      if (inputValue[inputValue.length - 1] === ',' && inputValue !== ',') {
        addChip(e);
      }
    },
    [addChip]
  );

  return (
    <>
      <input
        type='text'
        placeholder='Введите ключевые слова'
        className={styles.inputWrapper}
        onBlur={addChip}
        onKeyUp={onKeyUp}
      />
      {children}
    </>
  );
};

export const ChipsWrapper = memo(ChipsWrapperProto);
