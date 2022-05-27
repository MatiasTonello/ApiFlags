/* Import methods */

import { createFlag, createFlagByContinent } from './createFlag.js'
import { capitalizeFirstLetter } from './capitalize.js'

/* Id's const */
const btnSearch = document.querySelector('#btnSearch')
const inputSearch = document.querySelector('#search')
const filterByRegion = document.querySelector('#filterByRegion')

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
})

let timer = 0
const debouncedFetch = (value) => {
  clearTimeout(timer)
  timer = setTimeout(() => getAllFlags(value), 1000)
}

const getAllFlags = async (event) => {
  const value = event.target.value
  const result = await fetch(`https://restcountries.com/v3.1/name/${value}`)
  const results = await result.json()
  if (inputSearch.value === '') {
    loadFlags()
  }
  if (result.status === 200) {
    createFlagByContinent(results)
  } else if (result.status === 404) {
    document.getElementById('container__flags').innerHTML = `
    <div class="notExist"><h2>We couldn't find this country, please check that you typed it correctly. </h2></div>`
  }
  return results
}

inputSearch.addEventListener('input', debouncedFetch)

loadFlags()
