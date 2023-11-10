const sheet = document.querySelector('html');
const boddy = document.querySelector('body');
const changeBtn = document.querySelector('#themeBtn');

let isChanged = false;
changeBtn.addEventListener("click", () => {
  if (isChanged) {
    sheet.classList.add("darkhtml");
    boddy.classList.add("darkbody");
  }
  else{
    sheet.classList.remove("darkhtml");
    boddy.classList.remove("darkbody");
  }
  isChanged = !isChanged;
})

const api = {
  endpiont: "https://api.openweathermap.org/data/2.5/",
  key: "39d67236455891c124a778cf9f45b101"
}

const input = document.querySelector('#input');
input.addEventListener("keypress", enter);
function enter(e) {
  if (e.keyCode === 13){
    getInfo(input.value)
  };
}

async function getInfo(data){
  const resulting = await fetch(`${api.endpiont}weather?q=${data}&units=metric&appID=${api.key}`);
  const jsonRes = await resulting.json();
  displayRes(jsonRes);
}

const cityName = document.querySelector("#city")
const mainTemp = document.querySelector("#tempo")
const pogoda = document.querySelector("#pogoda")
const maxTemp = document.querySelector("#maxTemp")
const minTemp = document.querySelector("#minTemp")
const humidity = document.querySelector("#humid")
const photo = document.querySelector("#photo")
const today = document.querySelector("#day")
const date = new Date;
const dateOpt = {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
}
const currDate = date.toLocaleString('en-US', dateOpt)

function displayRes(jsonRes){
  cityName.textContent = `${jsonRes.name}, ${jsonRes.sys.country}`;
  mainTemp.textContent = `${Math.round(jsonRes.main.temp)}°`;
  maxTemp.textContent = `max temp. ${Math.round(jsonRes.main.temp_max)}°`;
  minTemp.textContent = `min temp. ${Math.round(jsonRes.main.temp_min)}°`;
  humidity.textContent = `humidity ${jsonRes.main.humidity}%`;
  pogoda.textContent = `${jsonRes.weather[0].main}`;
  today.textContent = currDate;
  if (jsonRes.main.temp > 30 && pogoda.textContent === "Clear"){
    photo.src = "weather - hot.jpg"
  }
  else if (jsonRes.main.temp < -20) {
    photo.src = "weather - freezing.jpg"
  }
  else if (pogoda.textContent === "Clear") {
    photo.src = "weather - clear sky.png"
  }
  else if (pogoda.textContent === "Clouds"){
    photo.src = "weather - clouds.jpeg"
  }
  else if (pogoda.textContent === "Rain"){
    photo.src = "weather - rain.jpg"
  }
  else if(pogoda.textContent === "Snow"){
    photo.src = "weather - snow.avif"
  }
  else if(pogoda.textContent === "Mist"){
    photo.src = "weather - mist.jpg"
  }
  else if(pogoda.textContent === "Drizzle"){
    photo.src = "weather - drizzle.png"
  }
  else if(pogoda.textContent === "Thunderstorm"){
    photo.src = "weather - thunderstorm.jpg"
  }
  else{
    photo.src = "https://cdn0.iconfinder.com/data/icons/mobile-apps-settings-ii-linear-white-with-black-ba/2048/1479_-_Weather-512.png"
  }
}
