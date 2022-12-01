import { useMemo, useState } from 'react';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [mealFilter, setMealFilter] = useState('');

  const value = useMemo(() => ({
    mealFilter, setMealFilter,
  }), [mealFilter]);

  return (
    <FoodContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
