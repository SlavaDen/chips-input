import React, { useState } from 'react';
import './App.css';
import { ChipsInput } from 'components';

function App() {
  const [value, setValue] = useState<string>(
    'это первый чипс, это второй, чипс'
  );

  return (
    <div>
      <h4>Пример использования готового компонента</h4>
      <div>
        <ChipsInput chips={value} setChips={setValue} />
      </div>
      {
        //TODO: Добавить стили
      }
      <div>Строковое представление: {value}</div>
    </div>
  );
}

export default App;
