import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const value = useMemo(() => ({}), []);
  return (
    <FoodContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
