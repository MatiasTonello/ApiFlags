/* Import methods */

import { createFlag, createFlagByContinent, getAllFlags } from './createFlag.js'
import { capitalizeFirstLetter } from './capitalize.js'

/* Id's const */
const btnSearch = document.querySelector('#btnSearch')
const inputSearch = document.querySelector('#search')
const filterByRegion = document.querySelector('#filterByRegion');

const loadFlags = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    if (response.status === 200) {
      const data = await response.json()
        createFlagByContinent(data)
    }
  } catch (error) {
    console.log(error)
  }
}

filterByRegion.addEventListener('change', async () => {
  let currentOption = filterByRegion.value
  if (currentOption === '0') {
    loadFlags()
  }
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${currentOption}`)
    if (response.status === 200) {
      const data = await response.json()
      createFlagByContinent(data)
    }
  } catch (error) {
    console.log(error)
  }
});

let timer = 0;
const debouncedFetch = (value) => {
  clearTimeout(timer);
  timer = setTimeout(() => getAllFlags(value), 1000);
};

inputSearch.addEventListener('input', debouncedFetch);

loadFlags();
