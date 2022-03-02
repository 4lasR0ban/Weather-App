const weather = {
    "ApiKey": config.API_KEY,
    fetchWeather1: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.ApiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    fetchWeather2: function(lat, long) {
        fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${this.ApiKey}`
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        alertText.classList.add("error");
        if (data.cod == "404") {
            alertText.innerText = `${search.value} isn't a valid city name!`;
        } else {
            alertText.classList.remove("error");
            alertText.innerText = "";
            console.log(data);
        }

        const { name } = data;
        const { id, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        console.log(name, id, description, temp, feels_like, humidity);
        document.querySelector('.city').innerText = name;

        //document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

        const weatherIcon = document.querySelector('.icon');
        if (id == 800) {
            weatherIcon.src = "assets/icons/clear.svg";
        } else if (id >= 200 && id <= 232) {
            weatherIcon.src = "assets/icons/storm.svg";
        } else if (id >= 300 && id <= 231) {
            weatherIcon.src = "assets/icons/rain.svg";
        } else if (id >= 500 && id <= 531) {
            weatherIcon.src = "assets/icons/rain.svg";
        } else if (id >= 600 && id <= 622) {
            weatherIcon.src = "assets/icons/snow.svg";
        } else if (id >= 700 && id <= 781) {
            weatherIcon.src = "assets/icons/haze.svg";
        } else if (id > 800 && id <= 804) {
            weatherIcon.src = "assets/icons/cloud.svg";
        }

        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.desc').innerText = description;
        document.querySelector('.feels').innerText = feels_like + "°C";
        document.querySelector('.humidity').innerText = humidity + "%";
    }
}
var date = new Date();
const day = ['Sunday', 'Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const search_btn = document.getElementById('search-btn');
const search = document.getElementById('search');
const search_device = document.getElementById('device-loc');
const alertText = document.querySelector('.alert');
document.getElementById('today').innerText = day[date.getDay()] + ', ' + month[date.getMonth()] + " " + date.getDate();

search.addEventListener('keyup', e => {
    if (e.key == "Enter" && search.value != "") {
        weather.fetchWeather1(search.value);
    } else if (search.value == "") {

    }
});

search_device.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Please allow the geolocation!');
    }
});

const onError = (error) => {
    alertText.innerText = error.message;
    alertText.classList.add("error");
};

const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    weather.fetchWeather2(latitude, longitude);
};

search_btn.addEventListener('click', function() {
    weather.fetchWeather1(search.value);
});

weather.fetchWeather1('Jakarta');