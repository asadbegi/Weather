const api = {
    key: 'aeb9a648de45dc65828b34450d2ec0df',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.serch-box');

searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        getResults(searchBox.value)
        console.log(searchBox.value);
    }
})

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then((weather) => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weatherEl = document.querySelector('.weather')
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low')
    hilow.innerHTML = `${weather.name.temp_min} °C / ${weather.name.temp.temp_max}°C`
}

function dateBuilder(s) {
    let month = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let day = days[s.getDay()];
    let date = s.getDate();
    let months = month[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${months} ${year}`
}