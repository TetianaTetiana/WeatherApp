let city = "Kyiv";
let celTemp = null;
let apiKey = "33efe89f103feda08ec5412af8a983d6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

formatDate = (timestemp) => {
  let days = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date(timestemp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

    if(hours < 10){
      hours = `0${hours}`;
    }
    if(minutes < 10){
      minutes = `0${minutes}`;
    }

  return `${day}, ${hours}:${minutes}\n${month}, ${year}`;
}

showWeather = (resp) => {
  // console.log(resp.data);
  // console.log(resp.data.weather[0].icon);
  // console.log(resp.data.dt * 1000);
  // console.log(new Date(resp.data.dt * 1000));
  celTemp = Math.round(resp.data.main.temp);

  let temp = celTemp;
  let city = resp.data.name;
  let humidity = resp.data.main.humidity;
  let wind = resp.data.wind.speed;
  let weatherDesc = resp.data.weather[0].description;

  let temperature = document.querySelector(".temperature");
  let cityName = document.querySelector("h1");
  let humidityElem = document.querySelector(".features");
  let day = document.querySelector("h2");
  let icon = document.querySelector(".img");
  let windspeed = document.querySelector(".wind");
  let description = document.querySelector(".weather-description");


  temperature.innerHTML = temp;
  cityName.innerHTML = city;
  day.innerHTML = formatDate(resp.data.dt * 1000);
  description.innerHTML = weatherDesc;
  windspeed.innerHTML = `wind speed &nbsp;&nbsp;&nbsp;${wind} km/s`;
  humidityElem.innerHTML =
  `humidity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${humidity}%`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`);
}
axios.get(apiUrl).then(showWeather);

searchCity = (event) =>{
  event.preventDefault()
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);


showFahrenheitTemp = () => {
  let temp = document.querySelector(".temperature");
  temp.innerHTML = Math.round(celTemp * 9 / 5 + 32);
  fahrenheit.classList.add("current");
  celsium.classList.remove("current");
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);


showCelsiumTemp = () => {
  let temp = document.querySelector(".temperature");
  temp.innerHTML = celTemp;
  fahrenheit.classList.remove("current");
  celsium.classList.add("current");
}
let celsium = document.querySelector(".celsium");
celsium.addEventListener("click", showCelsiumTemp);


getLocal = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b400ae3b711a616262d18b0ca2cbe78f&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
showCurrentTemp = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocal);
}
let currentBtn = document.querySelector(".real-temp");
currentBtn.addEventListener("click", showCurrentTemp);
