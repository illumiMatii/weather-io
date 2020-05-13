document.addEventListener("DOMContentLoaded", () => {
    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            main();
            input.value = "";
        }
    });
});

const APIKEY = "your api key";
const input = document.querySelector("#search");
const cityCountry = document.querySelector(".city-country");
const info = document.querySelector(".info");
const tags = document.querySelector(".tags");


let tag = document.createElement("h1");
let obj;
let icon = document.createElement("i");
let temp = document.createElement("h2");
let pressure = document.createElement("h2");
let humidity = document.createElement("h2");

cityCountry.appendChild(tag);


function main() {
    let value = input.value.trim();

    if(value) {
        cityCountry.style.display = "flex";
        
        info.style.display = "flex";
        info.appendChild(icon);
        
        tags.appendChild(temp);
        tags.appendChild(pressure);
        tags.appendChild(humidity);
        
        setWeather(value);
        setIcon(value);
    } else {
        cityCountry.style.display = "flex";
        info.style.display = "none";
        tag.textContent = "Sorry, something went wrong. Please search for a valid city";
    }
}

 async function setWeather(city) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
            .then(response => response.json())
            .then(data => {obj = data})
            .then(() => {
                tag.textContent = `${city}, ${obj.sys.country}`;
                temp.textContent = `Temperature: ${Math.round(obj.main.temp)}°C`;
                pressure.textContent = `Pressure: ${obj.main.pressure}hPa`;
                humidity.textContent = `Humidity: ${obj.main.humidity}%`;
            })
            .catch(() => {
                cityCountry.style.display = "flex";
                info.style.display = "none";
                tag.textContent = "Sorry, something went wrong. Please search for a valid city";
            });
}

async function setIcon(city) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
            .then(response => response.json())
            .then(data => {obj = data})
            .then(() => {
                icon.setAttribute("class", `wi wi-owm-${obj.weather[0].id}`)            
            });
}
