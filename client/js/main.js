document.addEventListener("DOMContentLoaded", () => {
    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            getValueOfInput();
        }
    });
});

const APIKEY = "e90cd750023e66c595c3b829c8fb731d";
const input = document.querySelector("#search");
const cityCountry = document.querySelector(".city-country");
const weatherInfo = document.querySelector(".info");

let tag = document.querySelector(".city-country > h2");
let obj;

function getValueOfInput() {
    let value = input.value.trim();

    if(value) {
        cityCountry.style.display = "flex";
        setWeather(value);

    } else {
        cityCountry.style.display = "flex";
        tag.textContent = "Sorry, something went wrong provide City name again";
    }
}

 async function setWeather(city) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
            .then(response => response.json())
            .then(data => {obj = data})
            .then(() => {
                tag.textContent = `${city}, ${obj.sys.country}`;
            })
            .catch(() => {
                cityCountry.style.display = "flex";
                tag.textContent = "Sorry, something went wrong provide City name again";
            });
}