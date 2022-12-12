const fetchSearchDrink = async (searchValue, searchFilter) => {
  if (searchFilter === 'ingredient') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`);
    // try {
    const data = await request.json();
    return data.drinks == null || data.drinks.length < 1 ? [] : data.drinks;
    // } catch (error) {
    // return [];
    // }
  }
  if (searchFilter === 'name') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const data = await request.json();
    return data.drinks == null || data.drinks.length < 1 ? [] : data.drinks;
  }
  if (searchFilter === 'first-letter') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`);
    const data = await request.json();
    return data.drinks == null || data.drinks.length < 1 ? [] : data.drinks;
  }
};

export default fetchSearchDrink;
