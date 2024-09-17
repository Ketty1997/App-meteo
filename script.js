//recupero gli elementi di interesse 
const htmlElement = document.documentElement;
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');

//recupero la mia posizione
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//funzione da eseguire in caso di errore
function onError() {
    //preparo degli elementi in pagina per far capire che va attivata
    weatherLocation.innerText = '';
    weatherIcon.alt = "geolocation disattivata";
    weatherIcon.src = "images/geolocation_disabled.png";
    suggestion.innerText = 'Attiva la geolocalizzazione';

    //disattivo il loading
    htmlElement.className = '';
}

//funzione da eseguire in caso di successo
async function onSuccess(position) {
    //recupero latitudine e longitudine
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //prepariamoci a chiamare l'Api di open weather

    const units = 'metric';
    const lang = 'it'

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;

    //chiamo api open weather
    const response = await fetch(endpoint);
    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    //riempio gli elementi della pagina
    weatherLocation.innerText = data.name;
    weatherIcon.alt = description;
    weatherIcon.src = `images/${iconCode}.png`;
    weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
    suggestion.innerText = getSuggestion(iconCode);

    //disattivo il loading
    htmlElement.className = '';
}

//funzione per decidere il suggerimento appropriato
function getSuggestion(iconCode) {
    return suggestions[iconCode];
}