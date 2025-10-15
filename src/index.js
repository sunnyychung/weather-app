import "./style.css";
import rain from "./resources/imgs/rainy.png";

// function drive(data) {
//     const date = new Date();
//     if (data.currentConditions.precip !== 0|| data.currentConditions.preciptype != null) {
//         // If theres an precipitation meaning rain, snow, etc; it could result in slippery surfaces.
//     }
//     else if (data.currentConditions.temp < 5){
//         // Temps below 5, tyres may take longer to warm up, below 3 and theres a chance for ice
//     }
//     else if (data.currentConditions.temp - data.currentConditions.dew < 2.5) {
//         /* States by if dew point and current temp are less than 2.5 there is a chance for thick fog to form meaning
//            decreased visibility */
//     }
//     else if (data.currentConditions.visibility < 3.1) {
//         // If visibility is less than 3.1 miles it could cause concern for visibility
//     }
//     else if (data.currentConditions.cloudcover > 80 && (date.getTime() < data.currentConditions.sunrise || date.getTime() > data.currentConditions.sunset)) {
//         // Could limit visibility in dark conditions
//     }
// }

function getTime() {
    const currentDate = new Date()
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    const time = document.getElementById("time");
    time.textContent = formattedTime;
}

function determineIcon(icon) {    
    if (icon == "rain") {
        import("./resources/imgs/rainy.png").then((image) => {
            const logo = document.getElementById("weatherLogo");
            logo.src = image.default;
        });
    }
    else if (icon == "cloudy" || icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {
        import("./resources/imgs/cloudy.png").then((image) => {
            const logo = document.getElementById("weatherLogo");
            logo.src = image.default;
        });
    }
    else if (icon == "clear-day" || icon == "clear-night") {
        import("./resources/imgs/daylight.png").then((image) => {
            const logo = document.getElementById("weatherLogo");
            logo.src = image.default;
        });
    }
}

function toDom(obj) {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;

    const date = document.getElementById("date");
    date.textContent = formattedDate;

    const location = document.getElementById("location");
    location.textContent = obj.location.toUpperCase();

    const temp = document.getElementById("temp");
    temp.textContent = `${obj.current.temp}°C`;

    const conditions = document.getElementById("conditions");
    conditions.textContent = `${obj.current.conditions.toUpperCase()}`;

    const desc = document.getElementById("desc");
    desc.textContent = `${obj.desc}`;

    determineIcon(obj.current.icon);
}

function parseData(data) {
    return {
        location: data.resolvedAddress,
        timezone: data.timezone,
        alerts: data.alerts,
        desc: data.description,
        current: data.currentConditions,
    };
}

async function getWeatherData(location) {
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next24hours?unitGroup=uk&key=QVLDBV834Z3EZKQSBHU6UBXRV&contentType=json`);
    const response = await data.json();;
    return parseData(response);
}

const submitBtn = document.getElementById("localSubmit");
const formInput = document.getElementById("localInput");

submitBtn.addEventListener("click", (event) => {
    const userInput = formInput.value;
    console.log(userInput);
    getWeatherData(userInput).then((data) => {
        toDom(data);
    });

    event.preventDefault();
})

setInterval(() => {
    getTime();
}, 1000);