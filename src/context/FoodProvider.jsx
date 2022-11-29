import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  return (
    <FoodContext.Provider value={ {} }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
