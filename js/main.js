/* Import methods */

import { createFlag, createFlagByContinent } from './createFlag.js'

/* Id's const */
const btnSearch = document.getElementById('searchBtn')
const inputSearch = document.getElementById('search')
const filterByRegion = document.getElementById('filterByRegion')

const loadFlags = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    if (response.status === 200) {
      const data = await response.json()

      let flags = ''
      for (let i = 0; i < data.length; i++) {
        flags += `
			    <div class="card__flag">
                <img class="card__flag_img" src="${data[i].flags.png}">   </img>
                <h3 class="card__flag_h3"> 
                ${data[i].name.common}</h3>
				<ul class="card__flag_ul">
                    <li>  Population : ${data[i].population} </li>
                    <li>  Region : ${data[i].region}</li>
                    <li>  Capital : ${data[i].capital}</li>
                </ul>
				</div>`
      }

      document.getElementById('container__flags').innerHTML = flags
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
  const flagToSearch = inputSearch.value
  console.log(flagToSearch)
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()

      let flag = ''
      const flagFound = data.find((element) => element.name.common === flagToSearch)
      console.log(flagFound)
      document.getElementById('container__flags').innerHTML = ''
      if (flagFound === undefined) {
        document.getElementById('container__flags').innerHTML =
          '<div class="notExist"> <h2> Country does not exist! Verify the desired name </h2> </div> '
      } else {
        createFlag(flagFound)
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
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      createFlagByContinent(data)
    }
  } catch (error) {
    console.log(error)
  }
})

loadFlags()
