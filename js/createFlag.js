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
  return (document.getElementById('container__flags').innerHTML = flag);
}

export function createFlagByContinent(continent) {
  let flags = ''
  for (let i = 0; i < continent.length; i++) {
    flags += createFlag(continent[i])
  }
  document.getElementById('container__flags').innerHTML = flags;
}


export const getAllFlags = async (event) => {
  const value = event.target.value;
  const result = await fetch(`https://restcountries.com/v3.1/name/${value}`);
  const results  = await result.json();
  console.log(results);
  createFlagByContinent(results);
  return results;
}