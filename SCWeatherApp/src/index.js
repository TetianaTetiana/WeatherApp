function currentData(){
  let days = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let now = new Date();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();

  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");
  let heading = document.querySelector("h1");

if(hour < 10){
  hour = `0${hour}`;
}
if(minutes < 10){
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day}, ${hour}:${minutes}`;
h3.innerHTML = `${month}, ${year}`;
};
currentData();



function showWeather(resp){
  console.log(resp.data);

  let tempRound = Math.round(resp.data.main.temp)
  let weatherDescription = resp.data.main.humidity;
  let heading = document.querySelector("h1");
  let temperature = document.querySelector(".temperature");
  let description = document.querySelector(".features")

  heading.innerHTML = resp.data.name;
  temperature.innerHTML = tempRound;
  description.innerHTML = `humidity&nbsp;&nbsp;&nbsp;${weatherDescription}%`;
}

function searchCity(event){
  event.preventDefault()
  let apiKey = "33efe89f103feda08ec5412af8a983d6";
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);



function showFTemp(){
  let temp = document.querySelector(".temperature");
  temp.innerHTML = '+9';
  fahrenheit.classList.add("current");
  celsium.classList.remove("current");
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showFTemp);



function showCTemp(){
  let temp = document.querySelector(".temperature");
  temp.innerHTML = `+2`;
  fahrenheit.classList.remove("current");
  celsium.classList.add("current");
}
let celsium = document.querySelector(".celsium");
celsium.addEventListener("click", showCTemp);



function getLocal(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b400ae3b711a616262d18b0ca2cbe78f&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showCurrentTemp(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocal);
}
let currentBtn = document.querySelector(".real-temp");
currentBtn.addEventListener("click", showCurrentTemp);

/* --------------------default location---------------------------------- */
let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
function showTemperature(response) {
  let tempRound = Math.round(response.data.main.temp);
  let weatherDescription = response.data.main.humidity;
  let temperature = document.querySelector(".temperature");
  let description = document.querySelector(".features");
  temperature.innerHTML = tempRound;
  description.innerHTML = `humidity&nbsp;&nbsp;&nbsp;${weatherDescription}%`;
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
