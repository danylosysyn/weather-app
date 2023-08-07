const apiKey = "6522c4af8c7d8bac38d76b981783ce01";

let vid = document.getElementsByClassName("background-vid")[0];
vid.play()

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((poz) => {
            let lon = poz.coords.longitude;
            let lat = poz.coords.latitude;

            const url = `http://api.openweathermap.org/data/2.5/weather?q=lviv&appid=${apiKey}`

            fetch(url)
                .then((rez) =>
                    rez.json())
                .then((data) => {
                    console.log(data)
                    reportWeather(data)
                })
        })
    }
})

function reportWeather(data) {
    let urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}`

    fetch(urlcast)
        .then((res) =>
            res.json())
        .then((forecast) => {
            console.log(forecast)
            dayForecast(forecast);
            hourForecast(forecast)

            document.getElementsByClassName("city-name")[0].innerText = data.name + ", " + data.sys.country;

            document.getElementsByClassName("current__temperature")[0].innerText = Math.round(data.main.temp - 273) + "C"

            document.getElementsByClassName("current__description")[0].innerText = data.weather[0].description

            let icon = data.weather[0].icon;
            let iconUrl = `http://api.openweathermap.org/img/w/${icon}.png`
            document.getElementById("current__img").src = iconUrl;

        })
}

function hourForecast(forecast) {
    let div = document.getElementById("upcoming__list");
    div.innerHTML = ""
    let descDiv = document.getElementsByClassName("upcoming__description")[0];

    for (let i = 0; i < 5; i++) {

        let hourBlock = document.createElement("li");
        hourBlock.setAttribute("class", "upcoming__container");

        let date = new Date(forecast.list[i].dt * 1000);

        let time = document.createElement("p");
        time.setAttribute("class", "upcoming__time");
        time.innerText = (date
            .toLocaleTimeString(undefined, "Asia/Kolkata")).replace(":00", "");

        let temperature = document.createElement("p");
        temperature.setAttribute("class", "upcoming__temperature");
        temperature.innerText = Math.round(forecast.list[i].main.temp_max - 273) + "C / " + Math.round(forecast.list[i].main.temp_min - 273) + "C";

        hourBlock.appendChild(time);
        hourBlock.appendChild(temperature);

        let description = document.createElement("p");
        description.setAttribute("class", "upcoming__paragraph");
        description.innerText = forecast.list[i].weather[0].description;

        descDiv.appendChild(description)
        div.appendChild(hourBlock)

    }
}

function dayForecast(forecast) {

}
