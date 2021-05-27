import React, { useState, useEffect } from 'react';
import Hatch from './components/Hatch/Hatch';
import { HatchType, createCalendar } from './helpers';
// Styles
import { GlobalStyle, StyledApp } from './App.styles';

const App: React.FC = () => {
  const [hatches, setHatches] = useState([] as HatchType[]);

  useEffect(() => {
    const calendar = localStorage.calendar
      ? JSON.parse(localStorage.calendar)
      : createCalendar();

    setHatches(calendar);
  }, []);

  //store calendar in localStorage
  useEffect(() => {
    hatches.length && localStorage.setItem('calendar', JSON.stringify(hatches));
  }, [hatches]);

  const handleClickHatch = (nr: number) => {
    const updatedHatches = hatches.map(hatch =>
      hatch.nr === nr
        ? {
            ...hatch,
            open: !hatch.open,
          }
        : hatch
    );
    setHatches(updatedHatches);
  };
  return (
    <StyledApp>
      <GlobalStyle />
      {hatches.map(hatch => (
        <Hatch
          key={hatch.nr}
          hatchData={hatch}
          handleClick={handleClickHatch}
        ></Hatch>
      ))}
    </StyledApp>
  );
};

export default App;
