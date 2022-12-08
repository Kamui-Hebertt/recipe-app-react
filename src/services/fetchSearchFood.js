const fetchSearchFood = async (searchValue, searchFilter) => {
  if (searchFilter === 'ingredient') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
    const data = await request.json();
    return data.meals == null || data.meals.length < 1 ? [] : data.meals;
  }
  if (searchFilter === 'name') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const data = await request.json();
    return data.meals == null || data.meals.length < 1 ? [] : data.meals;
  }
  if (searchFilter === 'first-letter') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
    const data = await request.json();
    return data.meals == null || data.meals.length < 1 ? [] : data.meals;
  }
};

export default fetchSearchFood;
