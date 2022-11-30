const fetchSearch = async (searchValue, searchFilter) => {
  try {
    if (searchFilter === 'ingredient') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      const data = await request.json();
      return data;
    }
    if (searchFilter === 'name') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      const data = await request.json();
      return data;
    }
    if (searchFilter === 'first-letter') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
      const data = await request.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

export default fetchSearch;
