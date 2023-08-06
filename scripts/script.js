const apiKey = "6522c4af8c7d8bac38d76b981783ce01";

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
        })
}

function dayForecast(forecast){

}

function hourForecast(forecast){

}
