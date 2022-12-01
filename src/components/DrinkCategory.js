import React, { useEffect, useState } from 'react';

function DrinkCategory() {
  const [categories, setCategories] = useState([]);
  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await request.json();
      console.log(data);
      setCategories(data.drinks);
    };
    fetchCategories();
  }, []);

  const five = 5;
  return (
    <div>
      <div>
        <button type="button" data-testid="All-category-filter">All</button>
      </div>
      {categories.slice(0, five)
        .map((element, i) => (
          <button
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            key={ i }
          >
            {element.strCategory}

          </button>
        ))}
    </div>
  );
}

export default DrinkCategory;
