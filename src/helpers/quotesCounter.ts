export const quotesCounter = (inputValue: string) => {
  let count = 0;
  for (let i = 0; i < inputValue.length; i++) {
    if (inputValue[i] === '"' || inputValue[i] === "'") {
      count++;
    }
  }
  return count;
};
