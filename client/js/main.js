document.addEventListener("DOMContentLoaded", () => {
    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            getValueOfInput();
            input.value = "";
        }
    });
});

const APIKEY = "e90cd750023e66c595c3b829c8fb731d";
const input = document.querySelector("#search");
const cityCountry = document.querySelector(".city-country");
const weatherInfo = document.querySelector(".info");


let tag = document.querySelector(".city-country > h1");
let obj;
let temp = document.createElement("h2");
let pressure = document.createElement("h2");
let humidity = document.createElement("h2");


function getValueOfInput() {
    let value = input.value.trim();

    if(value) {
        cityCountry.style.display = "flex";
        weatherInfo.style.display = "block";
        weatherInfo.appendChild(temp);
        weatherInfo.appendChild(pressure);
        weatherInfo.appendChild(humidity);
        setWeather(value);

    } else {
        cityCountry.style.display = "flex";
        weatherInfo.style.display = "none";
        tag.textContent = "Sorry, something went wrong provide City name again";
    }
}

 async function setWeather(city) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
            .then(response => response.json())
            .then(data => {obj = data})
            .then(() => {
                tag.textContent = `${city}, ${obj.sys.country}`;
                temp.textContent = `Temperature: ${Math.round(obj.main.temp)}°C`;
                pressure.textContent = `Pressure: ${obj.main.pressure} hPa`;
                humidity.textContent = `Humidity: ${obj.main.humidity}`;
            })
            .catch(() => {
                cityCountry.style.display = "flex";
                weatherInfo.style.display = "none";
                tag.textContent = "Sorry, something went wrong provide City name again";
            });
}