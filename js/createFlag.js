/* Create flag by pais and continent */

export function createFlag(pais) {
  let flag = ''
  flag += `<div class="card__flag">
      <img class="card__flag_img" src="${pais.flags.png}">   </img>
      <h3 class="card__flag_h3"> 
      ${pais.name.common}</h3>
      <ul class="card__flag_ul">
      <li>  Population : ${pais.population} </li>
      <li>  Region : ${pais.region}</li>
      <li>  Capital : ${pais.capital}</li>
      </ul>
      </div>`
  document.getElementById('container__flags').innerHTML = flag
}

export function createFlagByContinent(continent) {
  let flags = ''

  for (let i = 0; i < continent.length; i++) {
    flags += `
                  <div class="card__flag">
                  <img class="card__flag_img" src="${continent[i].flags.png}">   </img>
                  <h3 class="card__flag_h3"> 
                  ${continent[i].name.common}</h3>
                  <ul class="card__flag_ul">
                      <li>  Population : ${continent[i].population} </li>
                      <li>  Region : ${continent[i].region}</li>
                      <li>  Capital : ${continent[i].capital}</li>
                  </ul>
                  </div>`
  }
  document.getElementById('container__flags').innerHTML = flags
}
