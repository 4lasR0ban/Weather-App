const weather = {
    "ApiKey": '063ef9104d37bf3674baac8f76a8bc82',
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.ApiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp } = data.main;
        console.log(name, icon, description, temp);
        document.querySelector('.city').innerText = name;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.desc').innerText = description;
    }
}
var date = new Date();
const day = ['Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const search_btn = document.getElementById('search-btn');
const search = document.getElementById('search');
document.getElementById('today').innerText = day[date.getDay() - 1] + ', ' + month[date.getMonth()] + " " + date.getDate();


search_btn.addEventListener('click', function() {
    weather.fetchWeather(search.value);
})

weather.fetchWeather('Bogor');