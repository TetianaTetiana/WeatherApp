let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wenesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let h2 = document.querySelector("h2");
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day}, ${hour}:${minutes}`;

let h3 = document.querySelector("h3");
h3.innerHTML = `${month}, ${year}`;

let heading = document.querySelector("h1");
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  heading.innerHTML = searchInput.value;
}

function showFTemp() {
  temp.innerHTML = "+68";
  fahrenheit.classList.add("current");
  celsium.classList.remove("current");
}
function showCTemp() {
  temp.innerHTML = "+20";
  fahrenheit.classList.remove("current");
  celsium.classList.add("current");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let temp = document.querySelector(".temperature");
let celsium = document.querySelector(".celsium");
let fahrenheit = document.querySelector(".fahrenheit");
celsium.addEventListener("click", showCTemp);
fahrenheit.addEventListener("click", showFTemp);

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
