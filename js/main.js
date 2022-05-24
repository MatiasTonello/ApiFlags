/* Import methods */

import { createFlag, createFlagByContinent } from './createFlag.js'
import { capitalizeFirstLetter } from './capitalize.js'

/* Id's const */
const btnSearch = document.getElementById('searchBtn')
const inputSearch = document.getElementById('search')
const filterByRegion = document.getElementById('filterByRegion')

const loadFlags = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    if (response.status === 200) {
      const data = await response.json()
      for (let i = 0; i < data.length; i++) {
        createFlagByContinent(data);
      }

    } else if (respuesta.status === 401) {
      console.log('wrong key')
    } else if (respuesta.status === 404) {
      console.log('The flag doesnt exist')
    } else {
      console.log('Error')
    }
  } catch (error) {
    console.log(error)
  }
}

btnSearch.addEventListener('click', async () => {
  let flagToSearch = inputSearch.value;
  flagToSearch = capitalizeFirstLetter(flagToSearch);
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    if (response.status === 200) {
      const data = await response.json()
      const flagFound = data.find((element) => element.name.common === flagToSearch);
      
      document.getElementById('container__flags').innerHTML = ''
      if (flagFound === undefined) {
        document.getElementById('container__flags').innerHTML =
          '<div class="notExist"> <h2> Country does not exist! Verify the desired name </h2> </div> '
      } else {
        createFlag(flagFound);
      }
    }
  } catch (error) {
    console.log(error)
  }
})

filterByRegion.addEventListener('change', async () => {
  let currentOption = filterByRegion.value
  if (currentOption === '0') {
    loadFlags()
  }
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${currentOption}`)
    if (response.status === 200) {
      const data = await response.json()
      createFlagByContinent(data);
    }
  } catch (error) {
    console.log(error)
  }
})

loadFlags();
