const endPoint = "https://api.openweathermap.org/data/2.5/weather";
const apiK = "45062c862baa12f1cc3e58e86a1ffbae";
const ZERO_ABS = 273.15;

const form = document.querySelector('form');
const input = document.querySelector('input');
const div = document.querySelector('div.info-weather');

async function fetchWeather(city) {
  const response = await fetch(`${endPoint}?q=${city}&appid=${apiK}`);
  const data = await response.json();
  console.log(data);
  
  return data;
}

function kelvinToCelsius(k) {
  return Math.round(k - ZERO_ABS);
}

async function processData(city) {
  const weatherData = await fetchWeather(city);
  const { main } = weatherData;
  const { temp, temp_max, temp_min } = main;

  const tempK = kelvinToCelsius(temp);
  const temp_maxK = kelvinToCelsius(temp_max);
  const temp_minK = kelvinToCelsius(temp_min);
  
  return { tempK, temp_maxK, temp_minK };
}

function createPara(temp, data, container) {
  const para = document.createElement('p');
  para.innerText = `${temp}: ${data} °C`;
  container.append(para);
}

function displayWeather(weather) {
  const { tempK, temp_maxK, temp_minK } = weather;

  div.innerHTML = '';
  div.innerHTML = `<p>Weather on ${input.value.toUpperCase()}`;

  const divTemp = document.createElement('div');
  divTemp.classList.add('temp');

  createPara('temp', tempK, div);
  createPara('temp max', temp_maxK, divTemp);
  createPara('temp min', temp_minK, divTemp);
  div.append(divTemp);
}

async function handleSubmit(e) {
  e.preventDefault();
  // This works. It's another way to catch errors.
  // try {
  //   const weather = await processData(input.value);
  //   displayWeather(weather);
  // } catch(error) {
  //   alert(`There is an error: ${error}`);
  // }
  const weather = await processData(input.value);
  displayWeather(weather);
}

function handleError(error) {
  alert(`There is an error: ${error}`);
}

form.addEventListener('submit', (e) => handleSubmit(e).catch(handleError));

console.log('Starting...')
// fetchWeather('London');
// processData('London').then(result => console.log(result));